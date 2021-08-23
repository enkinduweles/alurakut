import { SiteClient } from 'datocms-client';

const USER_CONTENT = '1083247';

export default async function sendRequest(request, response) {
  const { userId, communityId } = request.query;

  if (request.method === 'PUT') {
    const TOKEN = process.env.READ_WRITE_TOKEN;
    const client = new SiteClient(TOKEN);

    try {
      const updatedRegister = await client.items.update(id, {
        ...request.body,
      });

      response.json({
        message: 'Response from API',
        data: updatedRegister,
      });
    } catch (error) {
      response.status(404).json(error.statusText);
    }

    return;
  }

  if (request.method === 'GET') {
    const TOKEN = process.env.READ_WRITE_TOKEN;
    const client = new SiteClient(TOKEN);

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

    const communities = await Promise.all(
      records.communities.map(async (idCommunity) => {
        return await client.items.find(idCommunity);
      })
    );

    response.json({
      message: 'Response from API',
      data: communities,
    });
    return;
  }

  if (request.method === 'POST') {
    const TOKEN = process.env.READ_WRITE_TOKEN;
    const client = new SiteClient(TOKEN);
    const newRegister = await client.items.create({
      itemType: DATOCMS_DEFINITIONS[content].modelId,
      ...request.body,
    });
    response.json({
      message: 'Response from API',
      data: newRegister,
    });
    return;
  }

  response.status(404).json({
    message: 'Sorry invald method',
  });
}
