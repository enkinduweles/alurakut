import { SiteClient } from 'datocms-client';
import { validateToken } from '../../src/utils/auth';

const USER_CONTENT = '1083247';
const SCRAPS = '1070396';

export default async function sendRequest(request, response) {
  const { scrapId, userId } = request.query;
  const { isAuthorized, id: githubUserId } = validateToken(
    request.headers.cookie
  );

  if (isAuthorized) {
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
      switch (request.method) {
        case 'GET':
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

        case 'POST':
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

        case 'DELETE':
          if (userId === githubUserId) {
            const deletedRegister = await client.items.destroy(scrapId);

            response.json({
              data: deletedRegister,
            });
            return;
          }

          response
            .status(403)
            .json({ message: 'Sorry you tried to do somenthing not allowed!' });
          return;

        default:
          response.status(501).json({
            message: 'Sorry, method not implemented',
          });
          return;
      }
    }
    response.status(404).json({
      message: 'Sorry, user not found!',
    });
    return;
  }

  response.status(401).json({
    message: 'Access denied, authentication failed',
  });
}
