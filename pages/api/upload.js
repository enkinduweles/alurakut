import { SiteClient } from 'datocms-client';
import sendRequest from '../../src/utils/requestHandler';
import formidable from 'formidable';

export const config = {
  api: {
    bodyParser: false,
  },
};

const form = formidable();

sendRequest
  .use(async (req, res, next) => {
    form.on('fileBegin', (fileName, file) => {
      console.log(fileName);
      console.log(file);
      file.path = `${form.uploadDir}\\${file.name}`;
    });

    form.parse(req, (err, fields, files) => {
      if (err) {
        next(err);
        return;
      }
      console.log(files);
      console.log(fields);
      const { name, size, path } = files.file;

      const uploadImg = {
        name,
        size,
        filePath: path,
      };

      req.uploadedFile = uploadImg;
      next();
    });
  })
  .post(async (req, res) => {
    console.log(req.uploadedFile);
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
