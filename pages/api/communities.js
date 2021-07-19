import { SiteClient } from 'datocms-client';

export default async function sendRequest(request, response) {
  if (request.method === 'POST') {
    const TOKEN = process.env.READ_WRITE_TOKEN;
    const client = new SiteClient(TOKEN);

    const newRegister = await client.items.create({
      itemType: '975326',
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
