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
    params: async(req,file) => {
        return {
            folder: 'resumes',
            allowed_formats: ['pdf', 'doc', 'docx'],
            resource_type: 'raw',
            public_id: `${Date.now()}-${file.originalname}`,
            
        };
    }
});
export {cloudinary, storage};