import { SiteClient } from 'datocms-client';

import axiosCustom from '../../src/utils/axiosConfig';
import sendRequest from '../../src/utils/ncFactory';
import { validateToken } from '../../src/utils/auth';

const TOKEN = process.env.PRIVATE_KEY;
const client = new SiteClient(TOKEN);

export default sendRequest()
  .use(async (request, response, next) => {
    const { isAuthorized, githubId, userId } = validateToken(
      request.headers.cookie
    );

    if (isAuthorized) {
      request.loggedInUser = { userId, githubId };
      next();
      return;
    }

    throw { status: 401 };
  })
  .get(async (request, response) => {
    const { userId, limitBy, page = 1 } = request.query;
    const start = page ? (page - 1) * limitBy : 0;

    const { data: responseData } = await axiosCustom.post('/', {
      query: `query {
      user(filter: {id: {eq: "${userId}"}}) {
        avatar
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
      console.log(responseData.errors);
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

    const { avatar } = user;
    const friends = allUsers;
    const communities = allCommunities;
    const totalFriends = _allUsersMeta.count;
    const totalCommunities = _allCommunitiesMeta.count;
    const totalScraps = _allScrapsMeta.count;

    const data = {
      avatar,
      communities,
      friends,
      counters: {
        totalCommunities,
        totalFriends,
        totalScraps,
      },
    };

    response.json(data);
  });
