import cookie from 'cookie';
import sendRequest from '../../src/utils/requestHandler';

sendRequest.post(async (request, response) => {
  response.setHeader(
    'Set-Cookie',
    cookie.serialize('TOKEN', '', {
      maxAge: -1,
      path: '/login',
    })
  );

  // response.writeHead(302, { Location: '/api/login' });
  response.end();
});

export default sendRequest;
