import jwt from 'jsonwebtoken';
import cookie from 'cookie';
import { SiteClient } from 'datocms-client';

const USER_CONTENT = '1083247';

export default async function sendRequest(request, response) {
  let token = null;
  const user = request.body.githubUser;

  if (request.method === 'POST' && Object.keys(user).length !== 0) {
    const data = await fetch(`https://api.github.com/users/${user}`);
    const parsedData = await data.json();

    if (parsedData.message) {
      response.status(404).json({
        token: null,
        error: 'user not found',
      });
      return;
    }

    token = jwt.sign(
      { githubUser: parsedData.login, id: parsedData.id },
      process.env.PRIVATE_KEY,
      {
        expiresIn: '1h',
      }
    );

    const TOKEN = process.env.READ_WRITE_TOKEN;
    const client = new SiteClient(TOKEN);

    const records = await client.items.all({
      filter: {
        type: USER_CONTENT,
        fields: {
          user_id: {
            eq: `${parsedData.id}`,
          },
        },
      },
    });

    if (records.length === 0) {
      await client.items.create({
        itemType: USER_CONTENT,
        userId: parsedData.id,
        scraps: null,
        userProfile: null,
        communities: null,
      });
    }

    response.setHeader(
      'Set-Cookie',
      cookie.serialize('TOKEN', token, {
        maxAge: 3600,
        httpOnly: true,
        path: '/',
      })
    );

    response.json({ error: null });
    return;
  }

  response.status(404).json({
    error: 'User not found',
  });
}
