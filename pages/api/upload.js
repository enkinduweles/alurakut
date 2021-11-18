import formidable from 'formidable';
import { SiteClient } from 'datocms-client';
import { readFile } from 'fs/promises';

import sendRequest from '../../src/utils/ncFactory';
import { validateToken } from '../../src/utils/auth';

export const config = {
  api: {
    bodyParser: false,
  },
};

const form = formidable({ uploadDir: './public' });

export default sendRequest()
  .use(async (request, response, next) => {
    const { isAuthorized } = validateToken(request.headers.cookie);

    if (isAuthorized) {
      form.on('fileBegin', (fileName, file) => {
        file.path = `${form.uploadDir}/${file.name}`;
      });

      form.parse(request, (err, fields, files) => {
        if (err) {
          next(err);
          return;
        }

        const { name, size, path } = files.file;

        const uploadImg = {
          name,
          size,
          filePath: path,
        };

        request.uploadedFile = uploadImg;
        next();
      });

      return;
    }

    throw { status: 401 };
  })
  .post(async (request, response) => {
    const { filePath } = request.uploadedFile;

    const TOKEN = process.env.PRIVATE_KEY;
    const client = new SiteClient(TOKEN);

    const path = await client.createUploadPath(filePath);
    const upload = await client.uploads.create({
      path,
    });

    response.status(201).json({ upload });
  });
