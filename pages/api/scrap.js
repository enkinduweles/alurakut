import { SiteClient } from 'datocms-client';

const USER_CONTENT = '1083247';
const SCRAPS = '1070396';

export default async function sendRequest(request, response) {
  const { scrapId, userId } = request.query;

  const TOKEN = process.env.READ_WRITE_TOKEN;
  const client = new SiteClient(TOKEN);

  let record = await client.items.all({
    filter: {
      type: USER_CONTENT,
      fields: {
        user_id: {
          eq: `${userId}`,
        },
      },
    },
  });

  if (record.length !== 0) {
    if (request.method === 'GET') {
      record = await Promise.all(
        record[0].scraps.map(async (scrap) => {
          return await client.items.find(scrap);
        })
      );

      const scraps = record.map((scrap) => {
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
        data: scraps,
      });
      return;
    }

    if (request.method === 'DELETE') {
      const deletedRegister = await client.items.destroy(scrapId);

      response.json({
        data: deletedRegister,
      });
      return;
    }

    if (request.method === 'POST') {
      const newRegister = await client.items.create({
        itemType: SCRAPS,
        ...request.body,
      });

      const updatedRecords = await client.items.update(record[0].id, {
        scraps: [...record[0].scraps, newRegister.id],
      });

      response.json({
        data: updatedRecords,
      });
      return;
    }

    response.status(501).json({
      message: 'Sorry, method not implemented',
    });
    return;
  }

  response.status(404).json({
    message: 'Sorry, user not found!',
  });

  // if (request.method === 'GET') {
  //   const TOKEN = process.env.READ_WRITE_TOKEN;
  //   const client = new SiteClient(TOKEN);

  //   let [records] = await client.items.all({
  //     filter: {
  //       type: USER_CONTENT,
  //       fields: {
  //         user_id: {
  //           eq: `${userId}`,
  //         },
  //       },
  //     },
  //   });

  //   records = await Promise.all(
  //     records.scraps.map(async (scrap) => {
  //       return await client.items.find(scrap);
  //     })
  //   );

  //   const scraps = records.map((scrap) => {
  //     const { id, author, message, userId, createdAt } = scrap;
  //     return {
  //       id,
  //       author,
  //       message,
  //       userId,
  //       posted: createdAt,
  //     };
  //   });

  //   scraps.sort((a, b) => {
  //     if (b.posted < a.posted) {
  //       return -1;
  //     }

  //     if (b.posted > a.posted) {
  //       return 1;
  //     }

  //     return 0;
  //   });

  //   response.json({
  //     message: 'Response from API',
  //     data: scraps,
  //   });
  //   return;
  // }

  // if (request.method === 'DELETE') {
  //   console.log('server');
  //   const TOKEN = process.env.READ_WRITE_TOKEN;
  //   const client = new SiteClient(TOKEN);

  //   const deletedRegister = await client.items.destroy(scrapId);

  //   response.json({
  //     message: 'Scrap succesfully deleted',
  //     data: deletedRegister,
  //   });
  //   return;
  // }

  // if (request.method === 'POST') {

  //   const newRegister = await client.items.create({
  //     itemType: SCRAPS,
  //     ...request.body,
  //   });

  //   const updatedRecords = await client.items.update(records.id, {
  //     scraps: [...records.scraps, newRegister.id],
  //   });

  //   response.json({
  //     message: 'Response from API',
  //     data: updatedRecords,
  //   });
  //   return;
  // }
}
