import { SiteClient } from 'datocms-client';

const DATOCMS_DEFINITIONS = {
  communities: {
    modelId: '975326',
  },
};

export default async function sendRequest(request, response) {
  const { id, content } = request.query;

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

    const records = await client.items.all({
      filter: {
        type: DATOCMS_DEFINITIONS[content].modelId,
        fields: {
          userId: {
            eq: `${id}`,
          },
        },
      },
    });

    response.json({
      message: 'Response from API',
      data: records,
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
