"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFileFromStorage = exports.uploadImage = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
// Define the directory where uploaded images will be stored
const uploadDir = path_1.default.join(process.cwd(), 'public', 'images', 'articles');
// Ensure the upload directory exists. If not, create it.
if (!fs_1.default.existsSync(uploadDir)) {
    fs_1.default.mkdirSync(uploadDir, { recursive: true });
}
// Configure storage for multer
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir); // Store files in the 'public/images/articles' directory
    },
    filename: (req, file, cb) => {
        // Generate a unique filename: timestamp-randomString.extname
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const fileExtension = path_1.default.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix + fileExtension);
    }
});
// Configure file filter to only allow image files
const fileFilter = (req, file, cb) => {
    const allowedMimes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (allowedMimes.includes(file.mimetype)) {
        cb(null, true); // Accept file
    }
    else {
        cb(new Error('Invalid file type. Only JPEG, PNG, GIF, and WebP image files are allowed.')); // Reject file
    }
};
// Create the multer upload instance
exports.uploadImage = (0, multer_1.default)({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // Limit file size to 5MB
    },
    fileFilter: fileFilter,
});
// Optional: Helper function to delete image files (useful if an article is deleted or image is replaced)
const deleteFileFromStorage = (filePath) => {
    try {
        // Ensure the path is relative to the project root for safety
        const fullPath = path_1.default.join(process.cwd(), 'public', filePath); // Assuming filePath starts like /images/articles/...
        if (fs_1.default.existsSync(fullPath)) {
            fs_1.default.unlinkSync(fullPath); // Delete the file
            return true;
        }
        return false;
    }
    catch (error) {
        console.error('Error deleting file:', error);
        return false;
    }
};
exports.deleteFileFromStorage = deleteFileFromStorage;
