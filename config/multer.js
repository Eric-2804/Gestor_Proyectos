import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'avatars', // Opcional: carpeta en tu Cloudinary
    allowed_formats: ['jpg', 'jpeg', 'png'],
    public_id: (req, file) => {
      return `avatar-${req.user?._id || Date.now()}`;
    }
  }
});

const upload = multer({ storage });

export default upload;