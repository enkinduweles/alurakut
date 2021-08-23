import { SiteClient } from 'datocms-client';

const USER_CONTENT = '1083247';

export default async function sendRequest(request, response) {
  const { profileId, userId } = request.query;

  if (request.method === 'PUT') {
    const TOKEN = process.env.READ_WRITE_TOKEN;
    const client = new SiteClient(TOKEN);

    const updatedRegister = await client.items.update(profileId, {
      ...request.body,
    });

    response.json({
      message: 'Response from API',
      data: updatedRegister,
    });

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

    let foundRecord = await client.items.find(records.userProfile);

    const parsedRecord = {
      id: foundRecord.id,
      city: foundRecord.city,
      state: foundRecord.state,
      profession: foundRecord.profession,
      contact: foundRecord.contact,
    };

    response.json({
      message: 'Response from API',
      data: parsedRecord,
    });
    return;
  }

  response.status(404).json({
    message: 'Sorry invald method',
  });
}
