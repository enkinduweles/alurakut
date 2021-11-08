import sendRequest from '../../src/utils/requestHandler';
import axios from '../../src/utils/axiosConfig';
import { SiteClient } from 'datocms-client';
import { validateToken } from '../../src/utils/auth';

const TOKEN = process.env.PRIVATE_KEY;
const client = new SiteClient(TOKEN);

const USER_MODEL = '1317096';

sendRequest.use(async (request, response, next) => {
  const { isAuthorized, githubId, userId } = validateToken(
    request.headers.cookie
  );
  console.log(isAuthorized);
  if (isAuthorized) {
    request.userLoggedIn = { userId, githubId };
    next();
    return;
  }
  const error = { statusCode: 401 };
  throw error;
});

sendRequest.get(async (request, response) => {
  const { userId, limitBy, page = 1 } = request.query;
  const start = page ? (page - 1) * limitBy : 0;

  const { data: responseData } = await axios.post('/', {
    query: `query {
      allUsers(filter: {id: {eq: "${userId}"}} first: "${limitBy}", skip: "${start}") {
       
        reliable
        sexy
        nice
        avatar
        friends {
          name
          id
          avatar
          githubId
        }
        communities {
          id
          name
          thumbnail {
            url
          }
        }
      }
    _allUsersMeta(filter: {friends: {allIn: "${userId}"}}) {
      count
    }
      _allCommunitiesMeta(filter: {members: {anyIn: "${userId}"}}) {
        count
      }
      _allScrapsMeta(filter: {reader: {in: "${userId}"}}) {
        count
      }
    }
    `,
  });

  if (responseData.errors) {
    const error = new Error('Ops something went wrong');
    error.status = 400;

    throw error;
  }
  const {
    allUsers,
    _allUsersMeta,
    _allCommunitiesMeta,
    _allScrapsMeta,
  } = responseData.data;

  console.log(allUsers[0].friends);
  const { avatar, friends, communities, ...personalityStatus } = allUsers[0];
  const totalFriends = _allUsersMeta.count;
  const totalCommunities = _allCommunitiesMeta.count;
  const totalScraps = _allScrapsMeta.count;

  const data = {
    avatar,
    communities,
    friends,
    personalityStatus,
    counters: {
      totalCommunities,
      totalFriends,
      totalScraps,
    },
  };

  response.json(data);
});

sendRequest.put(async (request, response) => {
  const { userLoggedIn } = request;
  const { userId } = request.query;

  if (userLoggedIn.userId === userId) {
    const { personalityName, value: countPersonality } = request.body;

    const { data: responseData } = await axios.post('/', {
      query: `query {
      user(filter: {id: {eq: "${userId}"}}) {
        ${personalityName}
      }
    }`,
    });

    if (responseData.errors) {
      const error = new Error('We could not get resources requested');
      error.statusCode = 422;

      throw error;
    }

    await client.items.update(userId, {
      [personalityName]: countPersonality,
    });

    response.json();
    return;
  }

  throw { statusCode: 403 };
});

export default sendRequest;
