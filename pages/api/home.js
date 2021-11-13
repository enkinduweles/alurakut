import sendRequest from '../../src/utils/requestHandler';
import axios from '../../src/utils/axiosConfig';
import { SiteClient } from 'datocms-client';
import { validateToken } from '../../src/utils/auth';

const TOKEN = process.env.PRIVATE_KEY;
const client = new SiteClient(TOKEN);

sendRequest.use(async (request, response, next) => {
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
});

sendRequest.get(async (request, response) => {
  const { userId, limitBy, page = 1 } = request.query;
  const start = page ? (page - 1) * limitBy : 0;

  const { data: responseData } = await axios.post('/', {
    query: `query {
      user(filter: {id: {eq: "${userId}"}}) {
        avatar
        nice
        sexy
        reliable
      }
      allUsers(filter: {friends: {allIn: "${userId}"}}, first: "${limitBy}", skip: "${start}") {
        name
        avatar
        githubId
        id
      }
      allCommunities(filter: {members: {allIn: "${userId}"}}, first: "${limitBy}", skip: "${start}") {
        id
        thumbnail {
          url
        }
        name
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
    throw { status: 400 };
  }

  const {
    user,
    allUsers,
    allCommunities,
    _allUsersMeta,
    _allCommunitiesMeta,
    _allScrapsMeta,
  } = responseData.data;

  const { avatar, ...personalityStatus } = user;
  const friends = allUsers;
  const communities = allCommunities;
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
  const { loggedInUser } = request;
  const { userId } = request.query;

  if (loggedInUser.userId === userId) {
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
