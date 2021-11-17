import formidable from 'formidable';
import { SiteClient } from 'datocms-client';

import sendRequest from '../../src/utils/ncFactory';
import { validateToken } from '../../src/utils/auth';

export const config = {
  api: {
    bodyParser: false,
  },
};

const form = formidable();

export default sendRequest()
  .use(async (request, res, next) => {
    const { isAuthorized } = validateToken(request.headers.cookie);

    if (isAuthorized) {
      form.on('fileBegin', (fileName, file) => {
        file.path = `${form.uploadDir}\\${file.name}`;
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
