import jwt from 'jsonwebtoken';
import cookie from 'cookie';
import axios from 'axios';
import axiosCustom from '../../src/utils/axiosConfig';
import { SiteClient } from 'datocms-client';
import sendRequest from '../../src/utils/requestHandler';

const PRIVATE_KEY = process.env.PRIVATE_KEY;
const client = new SiteClient(PRIVATE_KEY);

const USER = '1317096';

sendRequest.post(async (request, response) => {
  let token = null;

  const { userName } = request.body;

  if (Object.keys(userName).length !== 0) {
    const { data: githubResponse } = await axios.get(
      `https://api.github.com/users/${userName}`
    );

    const { data: datoResponse } = await axiosCustom.post('/', {
      query: `
    query {
      user(filter: {githubId: {eq: "${githubResponse.id}"}}) {
        id
      }
    }
    `,
    });

    if (datoResponse.errors) {
      throw { status: 400 };
    }
    console.log(githubResponse);
    if (datoResponse.data.user) {
      const slug = datoResponse.data.user.id;

      token = jwt.sign(
        {
          githubName: githubResponse.login,
          githubId: githubResponse.id,
          userId: slug,
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

      response.json({ error: null });
    } else {
      const newUser = await client.items.create({
        itemType: USER,
        name: githubResponse.login,
        avatar: `https://github.com/${githubResponse.login}.png`,
        githubId: githubResponse.id.toString(),
        location: githubResponse.location,
        statusMessage: githubResponse.bio,
        friends: null,
        scraps: null,
        communities: null,
        sexy: 1,
        nice: 1,
        reliable: 1,
      });

      token = jwt.sign(
        {
          githubName: githubResponse.login,
          userId: newUser.id,
          githubId: githubResponse.id,
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
