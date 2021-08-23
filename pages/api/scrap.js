import { SiteClient } from 'datocms-client';

const USER_CONTENT = '1083247';
const SCRAPS = '1070396';

export default async function sendRequest(request, response) {
  const { scrapId, userId } = request.query;

  if (request.method === 'GET') {
    const TOKEN = process.env.READ_WRITE_TOKEN;
    const client = new SiteClient(TOKEN);

    let [records] = await client.items.all({
      filter: {
        type: USER_CONTENT,
        fields: {
          user_id: {
            eq: `${userId}`,
          },
        },
      },
    });

    records = await Promise.all(
      records.scraps.map(async (scrap) => {
        return await client.items.find(scrap);
      })
    );

    const scraps = records.map((scrap) => {
      const { id, author, message, userId, createdAt } = scrap;
      return {
        id,
        author,
        message,
        userId,
        posted: createdAt,
      };
    });

    scraps.sort((a, b) => {
      if (b.posted < a.posted) {
        return -1;
      }

      if (b.posted > a.posted) {
        return 1;
      }

      return 0;
    });

    response.json({
      message: 'Response from API',
      data: scraps,
    });
    return;
  }

  if (request.method === 'DELETE') {
    console.log('server');
    const TOKEN = process.env.READ_WRITE_TOKEN;
    const client = new SiteClient(TOKEN);

    const deletedRegister = await client.items.destroy(scrapId);

    response.json({
      message: 'Scrap succesfully deleted',
      data: deletedRegister,
    });
    return;
  }

  if (request.method === 'POST') {
    const TOKEN = process.env.READ_WRITE_TOKEN;
    const client = new SiteClient(TOKEN);
    const newRegister = await client.items.create({
      itemType: SCRAPS,
      ...request.body,
    });

    const [records] = await client.items.all({
      filter: {
        type: USER_CONTENT,
        fields: {
          user_id: {
            eq: `${userId}`,
          },
        },
      },
    });

    const updatedRecords = await client.items.update(records.id, {
      scraps: [...records.scraps, newRegister.id],
    });

    response.json({
      message: 'Response from API',
      data: updatedRecords,
    });
    return;
  }

  response.status(404).json({
    message: 'Sorry invalid method',
  });
}
