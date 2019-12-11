import cloudinary from 'cloudinary';
import path from 'path';
import Datauri from 'datauri';
import upload from './multer-config';

require('./cloudinaryconfig');

const duri = new Datauri();

const uploadimage = async (file) => {
  upload.single('proof');
  const dataUri = duri.format(path.extname(file.originalname).toString(), file.buffer);
  const { content } = dataUri;
  const result = await cloudinary.v2.uploader.upload(content);
  return result.secure_url;
};

export default uploadimage;