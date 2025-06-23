import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Define the directory where uploaded images will be stored
const uploadDir = path.join(process.cwd(), 'public', 'images', 'articles');

// Ensure the upload directory exists. If not, create it.
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure storage for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // Store files in the 'public/images/articles' directory
  },
  filename: (req, file, cb) => {
    // Generate a unique filename: timestamp-randomString.extname
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const fileExtension = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + fileExtension);
  }
});

// Configure file filter to only allow image files
const fileFilter = (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const allowedMimes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
  
  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true); // Accept file
  } else {
    cb(new Error('Invalid file type. Only JPEG, PNG, GIF, and WebP image files are allowed.')); // Reject file
  }
};

// Create the multer upload instance
export const uploadImage = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // Limit file size to 5MB
  },
  fileFilter: fileFilter,
});

// Optional: Helper function to delete image files (useful if an article is deleted or image is replaced)
export const deleteFileFromStorage = (filePath: string): boolean => {
  try {
    // Ensure the path is relative to the project root for safety
    const fullPath = path.join(process.cwd(), 'public', filePath); // Assuming filePath starts like /images/articles/...
    
    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath); // Delete the file
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error deleting file:', error);
    return false;
  }
};