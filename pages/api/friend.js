import { SiteClient } from 'datocms-client';
import sendRequest from '../../src/utils/requestHandler';
import axios from '../../src/utils/axiosConfig';
import { validateToken } from '../../src/utils/auth';

const TOKEN = process.env.PRIVATE_KEY;
const client = new SiteClient(TOKEN);

const USER = '1317096';

sendRequest
  .use(async (request, response, next) => {
    const { isAuthorized, githubId, userId } = validateToken(
      request.headers.cookie
    );

    if (isAuthorized) {
      request.loggedInUser = { userId, githubId };
      next();
      return;
    }
    const error = { statusCode: 401 };
    throw error;
  })
  .get(async (request, response) => {
    const { userId, limitBy, page = 1, items = '' } = request.query;
    const start = page ? (page - 1) * limitBy : 0;

    const { data: responseData } = await axios.post('/', {
      query: `query {
        allUsers(filter: {friends: {allIn: "${userId}"}}, first: "${limitBy}", skip: "${start}") {
  
          id
          githubId
          name
          avatar
          location
        
      }
        _allUsersMeta(filter: {friends: {allIn: "${userId}"}}) {
          count
        }
      }`,
    });

    if (responseData.errors) {
      const error = new Error('Ops something went wrong');
      error.status = 400;

      throw error;
    }
    console.log(responseData.data.allUsers);

    const { allUsers, _allUsersMeta } = responseData.data;
    const friends = allUsers;
    const total = _allUsersMeta.count;
    const lastPage = Math.ceil(total / limitBy);
    const firstCountMark = page * limitBy - 5;
    const lastCountMark =
      page * limitBy < total ? firstCountMark + friends.length - 1 : total;

    const data = {
      friends,
      counters: {
        total,
        firstCountMark,
        lastCountMark,
        lastPage,
      },
    };

    response.json(data);
  })
  .post(async (request, response) => {
    const { loggedInUser } = request;
    const { userId } = request.query;

    if (userId === loggedInUser.userId) {
      const { githubId } = request.body;

      if (loggedInUser.githubId === githubId) {
        const error = new Error('Why do you want add yourself as a friend?');
        error.status = 400;
        throw error;
      }

      const { data: responseData } = await axios.post('/', {
        query: `query {
      allUsers(filter: {githubId: {eq: "${githubId}"}}) {
        id
        name
        friends {
          id
        }
      }
      user(filter: {id: {eq: "${userId}"}}) {
        id
        friends {
          id
        }
      }
    }`,
      });

      const {
        allUsers: [userToAdd],
        user,
      } = responseData.data;

      const updateListFriends = async (
        friends,
        friendsPersonToAdd,
        slug,
        idPersonToAdd
      ) => {
        let idsAlreadyExist = friendsPersonToAdd.map((item) => {
          return item.id;
        });

        await client.items.update(idPersonToAdd, {
          friends: [...idsAlreadyExist, slug],
        });

        idsAlreadyExist = friends.map((item) => {
          return item.id;
        });

        await client.items.update(slug, {
          friends: [...idsAlreadyExist, idPersonToAdd],
        });
      };

      if (userToAdd) {
        const foundUser = user.friends.some((user) => {
          return user.id === userToAdd.id;
        });

        if (foundUser) {
          const error = new Error('You already added this user!');
          error.statusCode = 400;
          throw error;
        } else {
          await updateListFriends(
            user.friends,
            userToAdd.friends,
            loggedInUser.userId,
            userToAdd.id
          );

          response.json();
          return;
        }
      }

      const newUser = await client.items.create({
        itemType: USER,
        ...request.body,
        statusMessage: 'Hi there',
        sexy: 1,
        nice: 1,
        reliable: 1,
        scraps: [],
        friends: [],
        communities: [],
      });

      await updateListFriends(
        user.friends,
        newUser.friends,
        loggedInUser.userId,
        newUser.id
      );

      response.status(201).json();
      return;
    }

    throw { statusCode: 403 };
  })

  .delete(async (request, response) => {
    const { loggedInUser } = request;
    const { userId, items } = request.query;

    if (userId === loggedInUser.userId) {
      const idsToDelete = items.split(/\s*(?:,|$)\s*/); //regex to remove space preceding a comma

      await client.item.bulkDestroy({
        items: idsToDelete,
      });

      response.json();
      return;
    }

    throw { statusCode: 403 };
  });

export default sendRequest;
