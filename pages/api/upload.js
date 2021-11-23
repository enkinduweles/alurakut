import { SiteClient } from 'datocms-client';

import axiosCustom from '../../src/utils/axiosConfig';
import sendRequest from '../../src/utils/ncFactory';
import { validateToken } from '../../src/utils/auth';

export default sendRequest()
  .use(async (request, response, next) => {
    const { isAuthorized } = validateToken(request.headers.cookie);

    if (isAuthorized) {
      next();
      return;
    }

    throw { status: 401 };
  })
  .post(async (request, response) => {
    const { body } = request;

    const TOKEN = process.env.PRIVATE_KEY;
    const client = new SiteClient(TOKEN);

    const path = await client.createUploadPath(body.thumbnail);

    const pathSplittedByDelimiter = path.split('-');
    pathSplittedByDelimiter.shift();

    const pathMounted = pathSplittedByDelimiter.join('-');
    const imageNameWithoutExtension = pathMounted.split('.');

    const { data: responseData } = await axiosCustom.post('/', {
      query: `query {
        allUploads(filter: {basename: {matches: {pattern: "${imageNameWithoutExtension[0]}"}}}) {
          id
          basename
        }
      }`,
    });

    const { allUploads } = responseData.data;
    if (allUploads.length !== 0) {
      response.json({ upload: { id: allUploads[0].id } });

      return;
    }
    console.log(responseData.data);
    const upload = await client.uploads.create({
      path,
    });

    response.status(201).json({ upload });
  });
