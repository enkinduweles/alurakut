import { SiteClient } from 'datocms-client';
import sendRequest from '../../src/utils/requestHandler';
import axios from '../../src/utils/axiosConfig';

const USER_CONTENT = '1083247';
const SCRAPS = '1070396';

const TOKEN = process.env.PRIVATE_KEY;
const client = new SiteClient(TOKEN);

sendRequest.get(async (request, response) => {
  const { userId, slug, limitBy, page = 1 } = request.query;
  const start = page ? (page - 1) * limitBy : 0;

  const { data: responseData } = await axios.post('/', {
    query: `query {
      user(filter: {githubId: {eq: "${userId}"}}) {
        avatar
      },
      allScraps(filter: {reader: {eq: "${slug}"}},first: "${limitBy}", skip: "${start}") {
        id
        writer {
          avatar
          githubId
          id
          name
        }
        message
      }
      _allScrapsMeta(filter: {reader: {eq: "${slug}"}}) {
        count
      }
    }`,
  });

  if (responseData.errors) {
    const error = new Error('Ops something went wrong');
    error.status = 400;

    throw error;
  }

  const { allScraps, _allScrapsMeta, user } = responseData.data;
  const avatar = user.avatar;
  const scraps = allScraps;
  const total = _allScrapsMeta.count;
  const firstCountMark = page * limitBy - 5;
  const lastCountMark = page * limitBy - 5 + (total - 1);
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
});

sendRequest.post(async (request, response) => {
  const { slug } = request.query;

  const newRegister = await client.items.create({
    itemType: SCRAPS,
    ...request.body,
  });

  const { data: responseData } = await axios.post('/', {
    query: `query {
    allScraps(filter: {reader: {eq: "${slug}"}}) {
      id
    }
  }`,
  });

  const { allScraps } = responseData.data;
  const idsAlreadyExists = allScraps.map((item) => item.id);

  await client.items.update(slug, {
    scraps: [...idsAlreadyExists, newRegister.id],
  });

  response.status(201).json({
    data: 'Scrap successfully added',
  });
  return;
});

sendRequest.delete(async (request, response) => {
  const { userId, githubId, items } = request.query;
  const idsToDelete = items.split(/\s*(?:,|$)\s*/); //regex to remove space preceding a comma
  console.log(idsToDelete);
  if (githubId === userId) {
    const deletedRegister = await client.item.bulkDestroy({
      items: idsToDelete,
    });

    response.json({
      data: deletedRegister,
    });
    return;
  }
});

export default sendRequest;
