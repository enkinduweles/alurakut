import jwt from 'jsonwebtoken';
import cookie from 'cookie';
import axios from '../../src/utils/axiosConfig';
import { SiteClient } from 'datocms-client';
import sendRequest from '../../src/utils/requestHandler';

const PRIVATE_KEY = process.env.PRIVATE_KEY;
const client = new SiteClient(PRIVATE_KEY);

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

    const { data } = await axios.post('/', {
      query: `
    query {
      user(filter: {githubId: {eq: "${parsedData.id}"}}) {
        id
      }
    }
    `,
    });

    let slug = null;

    if (data.data.user) {
      slug = data.data.user.id;

      token = jwt.sign(
        { githubName: parsedData.login, githubId: parsedData.id, userId: slug },
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

      response.json({ error: null });
    } else {
      const newUser = await client.items.create({
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

      token = jwt.sign(
        {
          githubName: parsedData.login,
          userId: newUser.id,
          githubId: parsedData.id,
        },
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

      response.status(201).json({ error: null });
    }
  }
});

export default sendRequest;
