import { SiteClient } from 'datocms-client';

import axiosCustom from '../../src/utils/axiosConfig';
import sendRequest from '../../src/utils/requestHandler';
import { validateToken } from '../../src/utils/auth';

const SCRAPS_MODEL = '1070396';

const TOKEN = process.env.PRIVATE_KEY;
const client = new SiteClient(TOKEN);

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

    throw { status: 401 };
  })
  .get(async (request, response) => {
    const { userId, limitBy, page = 1 } = request.query;
    const start = page ? (page - 1) * limitBy : 0;

    const { data: responseData } = await axiosCustom.post('/', {
      query: `query {
      user(filter: {id: {eq: "${userId}"}}) {
        avatar
      },
      allScraps(filter: {reader: {eq: "${userId}"}},first: "${limitBy}", skip: "${start}") {
        id
        writer {
          avatar
          githubId
          id
          name
        }
        message
      }
      _allScrapsMeta(filter: {reader: {eq: "${userId}"}}) {
        count
      }
    }`,
    });

    if (responseData.errors) {
      console.log(responseData.errors);
      const error = new Error('Ops something went wrong');
      error.status = 400;

      throw error;
    }

    const { allScraps, _allScrapsMeta, user } = responseData.data;
    const avatar = user.avatar;
    const scraps = allScraps;
    const total = _allScrapsMeta.count;
    const firstCountMark = page * limitBy - 5;
    const lastCountMark =
      page * limitBy < total ? firstCountMark + scraps.length - 1 : total;
    const lastPage = Math.ceil(total / limitBy);

    const data = {
      avatar,
      scraps,
      counters: {
        firstCountMark,
        lastCountMark,
        lastPage,
        total,
      },
    };
    response.json(data);
  })
  .post(async (request, response) => {
    const { userId } = request.query;

    const newRegister = await client.items.create({
      itemType: SCRAPS_MODEL,
      ...request.body,
    });

    const { data: responseData } = await axiosCustom.post('/', {
      query: `query {
    allScraps(filter: {reader: {eq: "${userId}"}}) {
      id
    }
  }`,
    });

    const { allScraps } = responseData.data;
    const idsAlreadyExists = allScraps.map((item) => item.id);

    await client.items.update(userId, {
      scraps: [...idsAlreadyExists, newRegister.id],
    });

    response.status(201).json({
      data: 'Scrap successfully added',
    });
    return;
  })
  .delete(async (request, response) => {
    const { userId, items } = request.query;
    const { loggedInUser } = request;

    const idsToDelete = items.split(/\s*(?:,|$)\s*/); //regex to remove space preceding a comma

    if (loggedInUser.userId === userId) {
      const deletedRegister = await client.item.bulkDestroy({
        items: idsToDelete,
      });

      response.json({
        data: deletedRegister,
      });
      return;
    }

    throw { status: 403 };
  });

export default sendRequest;
