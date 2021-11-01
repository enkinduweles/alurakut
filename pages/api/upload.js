import { SiteClient } from 'datocms-client';
import nextConnect from 'next-connect';
import formidable from 'formidable';

export const config = {
  api: {
    bodyParser: false,
  },
};

const form = formidable();

const handler = nextConnect();

handler.use(async (req, res, next) => {
  form.on('fileBegin', (fileName, file) => {
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
});

handler.post(async (req, res) => {
  console.log(req.uploadedFile);
  const { filePath } = req.uploadedFile;
  const TOKEN = process.env.READ_WRITE_TOKEN;
  const client = new SiteClient(TOKEN);

  const path = await client.createUploadPath(filePath);
  const upload = await client.uploads.create({
    path,
  });

  res.status(201).json({
    data: upload,
  });
});

export default handler;
