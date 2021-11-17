import axios from 'axios';
import cookie from 'cookie';
import jwt from 'jsonwebtoken';
import { SiteClient } from 'datocms-client';

import axiosCustom from '../../src/utils/axiosConfig';
import sendRequest from '../../src/utils/ncFactory';

const PRIVATE_KEY = process.env.PRIVATE_KEY;
const client = new SiteClient(PRIVATE_KEY);

const USER_MODEL = '1317096';

export default sendRequest().post(async (request, response) => {
  let token = null;

  const { userName } = request.body;

  console.log(userName);
  if (userName && Object.keys(userName).length !== 0) {
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
      console.log(datoResponse.errors);
      throw { status: 400 };
    }

    if (datoResponse.data.user) {
      console.log(datoResponse.data.user);

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
      return;
    } else {
      const newUser = await client.items.create({
        itemType: USER_MODEL,
        name: githubResponse.login,
        avatar: `https://github.com/${githubResponse.login}.png`,
        githubId: githubResponse.id.toString(),
        statusMessage: githubResponse.bio,
        profession: '',
        city: '',
        state: '',
        contact: '',
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
      return;
    }
  }

  throw { status: 400, message: 'You should place a valid github user' };
});
