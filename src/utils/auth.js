import jwt from 'jsonwebtoken';
import cookie from 'cookie';

export const validateToken = (httpCookie) => {
  if (httpCookie) {
    const { TOKEN } = cookie.parse(httpCookie);

    try {
      const { githubName, userId, githubId } = jwt.verify(
        TOKEN,
        process.env.SECRET
      );
      return {
        isAuthorized: true,
        githubName,
        githubId: githubId.toString(),
        userId,
      };
    } catch (err) {
      return { message: err, isAuthorized: false };
    }
  }

  return { isAuthorized: false };
};
