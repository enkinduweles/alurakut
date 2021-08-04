import jwt from 'jsonwebtoken';
import cookie from 'cookie';

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
