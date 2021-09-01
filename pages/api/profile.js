import { SiteClient } from 'datocms-client';
import { validateToken } from '../../src/utils/auth';

const USER_CONTENT = '1083247';
const PROFILE = '987747';

export default async function sendRequest(request, response) {
  const { userId } = request.query;
  const { isAuthorized, id: githubUserId } = validateToken(
    request.headers.cookie
  );

  if (isAuthorized) {
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
      switch (request.method) {
        case 'GET':
          if (record[0].userProfile) {
            let foundRecord = await client.items.find(record[0].userProfile);

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
          response.json({
            message: 'Profile not created yet',
            data: null,
          });
          return;

        case 'PUT':
          if (userId === githubUserId) {
            if (record[0].userProfile) {
              const updatedRecord = await client.items.update(
                record[0].userProfile,
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

            await client.items.update(record[0].id, {
              userProfile: newRegister.id,
            });

            response.status(201).json({
              data: parsedRecord,
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
