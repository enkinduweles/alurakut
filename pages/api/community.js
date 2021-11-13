import { SiteClient } from 'datocms-client';
import sendRequest from '../../src/utils/requestHandler';
import axios from '../../src/utils/axiosConfig';
import { validateToken } from '../../src/utils/auth';

const TOKEN = process.env.PRIVATE_KEY;
const client = new SiteClient(TOKEN);

const USER = '1317096';
const COMMUNITY_MODEL = '975326';

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
    const { userId, limitBy, page = 1 } = request.query;

    const start = page ? (page - 1) * limitBy : 0;

    const { data: responseData } = await axios.post('/', {
      query: `query {
        user(filter: {id: {eq: "${userId}"}}) {
          avatar
        }
      allCommunities(filter: {members: {eq: "${userId}"}}, first: "${limitBy}", skip: "${start}") {
        id
        name
        members{
          id
        }
        thumbnail {
          url
        }
      }
      _allCommunitiesMeta(filter: {members: {eq: "${userId}"}}) {
            count
          }
    }`,
    });

    if (responseData.errors) {
      const error = new Error('Ops something went wrong');
      error.status = 400;

      throw error;
    }

    const { user, allCommunities, _allCommunitiesMeta } = responseData.data;
    const communities = allCommunities;
    const total = _allCommunitiesMeta.count;
    const lastPage = Math.ceil(total / limitBy);
    const firstCountMark = page * limitBy - 5;
    const lastCountMark =
      page * limitBy < total ? firstCountMark + communities.length - 1 : total;

    const data = {
      avatar: user.avatar,
      communities,
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
      const { body } = request;

      const { data: responseData } = await axios.post('/', {
        query: `query {
          allCommunities(filter: {name: {matches: {pattern: "${body.name}"}}}) {
            id
            name
            thumbnail {
              url
            }
          }
        }`,
      });

      const { allCommunities } = responseData.data;

      if (allCommunities.length !== 0) {
        throw { status: 400, message: 'Community already exist' };
      }

      const { data: communitiesData } = await axios.post('/', {
        query: `query {
          user(filter: {id: {eq: "${userId}"}}) {
            communities{
              id
            }
          }
        }`,
      });

      let thumbnail = {};

      if (!body.thumbnail.uploadId) {
        const { data: defaultThumbnail } = await axios.post('/', {
          query: `query {
            allUploads(filter: {tags: {contains: "community"}}) {
              id
              url
            }
          }`,
        });
        thumbnail = { uploadId: defaultThumbnail.data.allUploads[0].id };
      } else {
        thumbnail = body.thumbnail;
      }

      const newCommunity = await client.items.create({
        itemType: COMMUNITY_MODEL,
        ...request.body,
        members: [userId],
        thumbnail,
      });

      const { user } = communitiesData.data;

      const communitiesIds = user.communities.map((item) => {
        return item.id;
      });

      await client.items.update(userId, {
        communities: [...communitiesIds, newCommunity.id],
      });

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
