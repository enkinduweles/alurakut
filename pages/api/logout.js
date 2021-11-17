import cookie from 'cookie';

import sendRequest from '../../src/utils/ncFactory';

export default sendRequest().post(async (request, response) => {
  response.setHeader(
    'Set-Cookie',
    cookie.serialize('TOKEN', '', {
      maxAge: 0,
      path: '/',
    })
  );

  response.end();
});
