import jwt from 'jsonwebtoken';
import cookie from 'cookie';

export const validateToken = (httpCookie) => {
  if (httpCookie) {
    const { TOKEN } = cookie.parse(httpCookie);

    try {
      const { userName, userId } = jwt.verify(TOKEN, process.env.SECRET);
      return { isAuthorized: true, userName, userId: userId.toString() };
    } catch (err) {
      return { message: err, isAuthorized: false };
    }
  }

  return { isAuthorized: false };
};
