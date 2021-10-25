import jwt from 'jsonwebtoken';
import cookie from 'cookie';
import { SiteClient } from 'datocms-client';
import sendRequest from '../../src/utils/requestHandler';

const USER = '1317096';

sendRequest.post(async (request, response) => {
  let token = null;
  const userName = request.body.userName;

  if (Object.keys(userName).length !== 0) {
    const responseGithub = await fetch(
      `https://api.github.com/users/${userName}`
    );

    if (!responseGithub.ok) {
      const customError = new Error('User not found');
      customError.status = responseGithub.status;

      throw customError;
    }

    const parsedData = await responseGithub.json();

    token = jwt.sign(
      { userName: parsedData.login, userId: parsedData.id },
      process.env.SECRET,
      {
        expiresIn: '1h',
      }
    );

    response.setHeader(
      'Set-Cookie',
      cookie.serialize('TOKEN', token, {
        maxAge: 3600,
        httpOnly: true,
        path: '/',
      })
    );

    const PRIVATE_KEY = process.env.PRIVATE_KEY;
    const client = new SiteClient(PRIVATE_KEY);

    const user = await client.items.all({
      filter: {
        type: USER,
        fields: {
          github_id: {
            eq: `${parsedData.id}`,
          },
        },
      },
    });

    if (user.length === 0) {
      await client.items.create({
        itemType: USER,
        name: parsedData.login,
        avatar: `https://github.com/${parsedData.login}.png`,
        githubId: parsedData.id.toString(),
        location: parsedData.location,
        statusMessage: parsedData.bio,
        friends: null,
        scraps: null,
        communities: null,
      });

      response
        .status(201)
        .json({ status: 'User successfuly created', error: null });

      return;
    }

    response.json({ error: null });

    return;
  }
});

export default sendRequest;
