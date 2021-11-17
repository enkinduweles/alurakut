import { SiteClient } from 'datocms-client';

import axiosCustom from '../../src/utils/axiosConfig';
import sendRequest from '../../src/utils/ncFactory';
import { validateToken } from '../../src/utils/auth';

const TOKEN = process.env.PRIVATE_KEY;
const client = new SiteClient(TOKEN);

export default sendRequest()
  .use(async (request, response, next) => {
    const { isAuthorized, githubId, userId } = validateToken(
      request.headers.cookie
    );

    if (isAuthorized) {
      request.loggedInUser = { userId, githubId };
      next();
      return;
    }

    throw { status: 401 };
  })
  .get(async (request, response) => {
    const { userId } = request.query;

    const { data: responseData } = await axiosCustom.post('/', {
      query: `query {
      user(filter: {id: {eq: "${userId}"}}) {
        avatar
        statusMessage
        profession
        city
        state
        contact
      }
    }`,
    });

    if (responseData.errors) {
      console.log(responseData.errors);
      throw { status: 400, message: "We couldn't load user's profile" };
    }

    const { user } = responseData.data;

    response.json(user);
  })
  .put(async (request, response) => {
    const { userId } = request.query;
    const { loggedInUser, body } = request;

    if (userId === loggedInUser.userId) {
      const { data: responseData } = await axiosCustom.post('/', {
        query: `query {
        user(filter: {id: {eq: "${userId}"}}) {
          id
        }
      }`,
      });

      if (responseData.errors) {
        console.log(responseData.errors);
        throw { status: 400, message: "We couldn't load user's profile" };
      }

      const { user } = responseData.data;

      if (user) {
        await client.items.update(loggedInUser.userId, {
          ...body,
        });
      }
      response.end();
      return;
    }

    throw { status: 403 };
  });
