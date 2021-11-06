import { SiteClient } from 'datocms-client';
import sendRequest from '../../src/utils/requestHandler';
import axios from '../../src/utils/axiosConfig';

const TOKEN = process.env.PRIVATE_KEY;
const client = new SiteClient(TOKEN);

const USER = '1317096';

sendRequest.get(async (request, response) => {
  const { userId, limitBy, page = 1, items = '' } = request.query;
  const start = page ? (page - 1) * limitBy : 0;

  const { data: responseData } = await axios.post('/', {
    query: `query {
        allUsers(filter: {githubId: {id: "${userId}"}}, first: "${limitBy}", skip: "${start}") {
          friends {
            id
            githubId
            name
            avatar
            location
          }
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

  const { allUsers, _allUsersMeta } = responseData.data;
  const friends = allUsers[0].friends;
  const total = _allUsersMeta.count;
  const lastPage = Math.ceil(total / limitBy);
  const firstCountMark = page * limitBy - 5;
  const lastCountMark = page * limitBy - 5 + (total - 1);

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
});

sendRequest.post(async (request, response) => {
  const { userLoggedIn } = request;
  const { userId, slug } = request.query;

  if (slug === userLoggedIn.slug) {
    const { githubId } = request.body;

    if (userLoggedIn.githubId === githubId) {
      const error = new Error('Why do you want add yourself as a friend?');
      error.statusCode = 400;
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
          slug,
          userToAdd.id
        );

        response.json();
        return;
      }
    }

    const newUser = await client.items.create({
      itemType: USER,
      ...request.body,
    });

    await updateListFriends(user.friends, newUser.friends, slug, newUser.id);

    response.status(201).json();
  }

  throw { statusCode: 403 };
});

sendRequest.delete(async (request, response) => {
  const { userLoggedIn } = request;
  const { slug, items } = request.query;

  if (slug === userLoggedIn.slug) {
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
