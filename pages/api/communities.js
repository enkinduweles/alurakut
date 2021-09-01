import { SiteClient } from 'datocms-client';

const USER_CONTENT = '1083247';

export default async function sendRequest(request, response) {
  const { userId, communityId } = request.query;

  const TOKEN = process.env.READ_WRITE_TOKEN;
  const client = new SiteClient(TOKEN);

  const record = await client.items.all({
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
      const communities = await Promise.all(
        record[0].communities.map(async (idCommunity) => {
          return await client.items.find(idCommunity);
        })
      );

      response.json({
        data: communities,
      });
      return;
    }

    if (request.method === 'PUT') {
      const updatedRegister = await client.items.update(id, {
        ...request.body,
      });

      response.json({
        data: updatedRegister,
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
}
