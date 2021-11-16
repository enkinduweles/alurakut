import formidable from 'formidable';
import { SiteClient } from 'datocms-client';

import sendRequest from '../../src/utils/requestHandler';

export const config = {
  api: {
    bodyParser: false,
  },
};

const form = formidable();

sendRequest
  .use(async (req, res, next) => {
    const { isAuthorized } = validateToken(request.headers.cookie);

    if (isAuthorized) {
      form.on('fileBegin', (fileName, file) => {
        file.path = `${form.uploadDir}\\${file.name}`;
      });

      form.parse(req, (err, fields, files) => {
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

        req.uploadedFile = uploadImg;
        next();
      });

      return;
    }

    throw { status: 401 };
  })
  .post(async (req, res) => {
    const { filePath } = req.uploadedFile;

    const TOKEN = process.env.PRIVATE_KEY;
    const client = new SiteClient(TOKEN);

    const path = await client.createUploadPath(filePath);
    const upload = await client.uploads.create({
      path,
    });

    res.status(201).json({
      upload,
    });
  });

export default sendRequest;
