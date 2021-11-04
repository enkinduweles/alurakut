import sendRequest from '../../src/utils/requestHandler';
import axios from '../../src/utils/axiosConfig';
import { SiteClient } from 'datocms-client';

const TOKEN = process.env.PRIVATE_KEY;
const client = new SiteClient(TOKEN);

const USER_MODEL = '1317096';

sendRequest.get(async (request, response) => {
  const { userId, limitBy, page = 1, slug } = request.query;
  const start = page ? (page - 1) * limitBy : 0;

  const { data: responseData } = await axios.post('/', {
    query: `query {
      user(filter: {githubId: {eq: "${userId}"}}) {
        avatar
        reliable
        sexy
        nice
      }
      _allUsersMeta(filter: {friends: {allIn: "${slug}"}}) {
        count
      }
      allUsers(filter: {githubId: {eq: "${userId}"}} first: "${limitBy}", skip: "${start}") {
        friends {
          name
          id
          avatar
          githubId
        }
      }
      _allCommunitiesMeta(filter: {members: {anyIn: "${slug}"}}) {
        count
      }
      allCommunities(filter: {githubId: {eq: "${userId}"}}, first: "${limitBy}", skip: "${start}") {
        name
        thumbnail {
          url
        }
        id
      }
      _allScrapsMeta(filter: {reader: {in: "${slug}"}}) {
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
    user,
    allUsers,
    allCommunities,
    _allUsersMeta,
    _allCommunitiesMeta,
    _allScrapsMeta,
  } = responseData.data;

  const { avatar, ...personalityStatus } = user;
  const friends = allUsers[0].friends;
  const totalFriends = _allUsersMeta.count;
  const communities = allCommunities;
  const totalCommunities = _allCommunitiesMeta.count;
  const totalScraps = _allScrapsMeta.count;

  response.json({
    avatar,
    communities,
    friends,
    personalityStatus,
    counters: {
      totalCommunities,
      totalFriends,
      totalScraps,
    },
  });
});

sendRequest.put(async (request, response) => {
  const { userId, slug } = request.query;
  const { personalityName, value: countPersonality } = request.body;

  const { data: responseData } = await axios.post('/', {
    query: `query {
      user(filter: {githubId: {eq: "${userId}"}}) {
        ${personalityName}
      }
    }`,
  });

  if (responseData.errors) {
    const error = new Error('We could not get resources requested');
    error.statusCode = 422;

    throw error;
  }

  await client.items.update(slug, {
    [personalityName]: countPersonality,
  });

  response.json({ message: 'Successfuly updated' });
});

export default sendRequest;
