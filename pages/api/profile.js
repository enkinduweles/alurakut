import { SiteClient } from 'datocms-client';

const USER_CONTENT = '1083247';
const PROFILE = '987747';

export default async function sendRequest(request, response) {
  const { userId } = request.query;

  if (request.method === 'PUT') {
    const TOKEN = process.env.READ_WRITE_TOKEN;
    const client = new SiteClient(TOKEN);

    const records = await client.items.all({
      filter: {
        type: USER_CONTENT,
        fields: {
          user_id: {
            eq: `${userId}`,
          },
        },
      },
    });

    if (records.length !== 0) {
      if (records[0].userProfile) {
        const foundRecord = await client.items.find(records[0].userProfile);

        const updatedRecord = await client.items.update(
          records[0].userProfile,
          {
            ...request.body,
          }
        );

        const parsedRecord = {
          id: updatedRecord.id,
          city: updatedRecord.city,
          state: updatedRecord.state,
          profession: updatedRecord.profession,
          contact: updatedRecord.contact,
        };

        response.json({
          data: parsedRecord,
        });
        return;
      }

      const newRegister = await client.items.create({
        itemType: PROFILE,
        ...request.body,
        userId: userId,
        profileStatus: '',
      });

      const parsedRecord = {
        id: newRegister.id,
        city: newRegister.city,
        state: newRegister.state,
        profession: newRegister.profession,
        contact: newRegister.contact,
      };

      await client.items.update(records[0].id, {
        userProfile: newRegister.id,
      });

      response.status(201).json({
        data: parsedRecord,
      });
      return;
    }

    response.status(404).json({
      message: 'Something is wrong',
      data: null,
    });
    return;
  }

  if (request.method === 'GET') {
    const TOKEN = process.env.READ_WRITE_TOKEN;
    const client = new SiteClient(TOKEN);

    const records = await client.items.all({
      filter: {
        type: USER_CONTENT,
        fields: {
          user_id: {
            eq: `${userId}`,
          },
        },
      },
    });

    if (records.length !== 0) {
      const [record] = records;
      let foundRecord = await client.items.find(record.userProfile);

      const parsedRecord = {
        id: foundRecord.id,
        city: foundRecord.city,
        state: foundRecord.state,
        profession: foundRecord.profession,
        contact: foundRecord.contact,
      };

      response.json({
        data: parsedRecord,
      });
      return;
    }

    response.status(404).json({
      message: 'Data not found',
      data: null,
    });
    return;
  }

  response.status(404).json({
    message: 'Sorry invald method',
  });
}
