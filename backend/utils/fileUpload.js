import multer from 'multer';
import path from 'path';
import { ErrorResponse } from '../middleware/errorHandler.js';

// Configure multer for memory storage
const storage = multer.memoryStorage();

// File filter
const fileFilter = (req, file, cb) => {
  // Allowed file types
  const allowedTypes = /jpeg|jpg|png|gif|pdf/;
  
  // Check extension
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  
  // Check mime type
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new ErrorResponse('Only images (jpeg, jpg, png, gif) and PDF files are allowed', 400));
  }
};

// Configure upload
export const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: fileFilter
});

// Single file upload
export const uploadSingle = upload.single('file');

// Multiple files upload
export const uploadMultiple = upload.array('files', 5);
