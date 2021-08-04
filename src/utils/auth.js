import jwt from 'jsonwebtoken';
import cookie from 'cookie';

export const validateToken = (httpCookie) => {
  if (httpCookie) {
    const { TOKEN } = cookie.parse(httpCookie);

    try {
      const { githubUser, id } = jwt.verify(TOKEN, process.env.PRIVATE_KEY);
      return { isAuthorized: true, githubUser, id };
    } catch (err) {
      return { message: err, isAuthorized: false };
    }
  }

  return { isAuthorized: false };
};
