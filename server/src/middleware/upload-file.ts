import multer from 'multer';
import { storage } from '../utills/cloudinary';

const upload = multer({ storage });

export default upload;
