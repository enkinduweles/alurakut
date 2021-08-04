import { SiteClient } from 'datocms-client';

const DATOCMS_DEFINITIONS = {
  communities: {
    modelId: '975326',
  },
};

export default async function sendRequest(request, response) {
  const { id } = request.query;
  const { communities } = DATOCMS_DEFINITIONS;

  if (request.method === 'PUT') {
    const TOKEN = process.env.READ_WRITE_TOKEN;
    const client = new SiteClient(TOKEN);

    await client.items.update(id, {
      ...request.body,
    });

    response.json({
      message: 'Response from API',
    });
    return;
  }

  if (request.method === 'POST') {
    const TOKEN = process.env.READ_WRITE_TOKEN;
    const client = new SiteClient(TOKEN);

    const newRegister = await client.items.create({
      itemType: communities.modelId,
      ...request.body,
    });

    response.json({
      message: 'Response from API',
      data: newRegister,
    });
    return;
  }

  response.status(404).json({
    message: "Sorry GET method doesn't return data",
  });
}
