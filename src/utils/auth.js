import jwt from 'jsonwebtoken';
import cookie from 'cookie';

export const validateToken = (httpCookie) => {
  if (httpCookie) {
    const { TOKEN } = cookie.parse(httpCookie);

    try {
      const { githubUser } = jwt.verify(TOKEN, process.env.PRIVATE_KEY);
      return { isAuthorized: true, githubUser };
    } catch (err) {
      return { message: err, isAuthorized: false };
    }
  }

  return { isAuthorized: false };
};
