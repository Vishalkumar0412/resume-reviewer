import {v2 as cloudinary} from 'cloudinary';
import {CloudinaryStorage} from 'multer-storage-cloudinary'

import dotenv from 'dotenv';
dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDNARY_CLOUD_NAME,
    api_key: process.env.CLOUDNARY_API_KEY,
    api_secret: process.env.CLOUDNARY_API_SECRET,
    secure: true
})


const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    const originalName = file.originalname;
    const extension = originalName.split('.').pop(); // e.g., 'pdf'
    const baseName = originalName.split('.').slice(0, -1).join('.'); // handles dots in filename

    return {
      folder: 'resumes',
      allowed_formats: ['pdf'],
      resource_type: 'raw',
     public_id: `${Date.now()}-${baseName}` // ✅ correct

    };
  },
});
export {cloudinary, storage};