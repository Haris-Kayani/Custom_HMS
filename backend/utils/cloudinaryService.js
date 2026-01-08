import cloudinary from '../config/cloudinary.js';

// Upload image to Cloudinary
export const uploadToCloudinary = async (file, folder = 'custom-hms') => {
  try {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          folder: folder,
          resource_type: 'auto',
          transformation: [
            { width: 800, height: 800, crop: 'limit' },
            { quality: 'auto' },
            { fetch_format: 'auto' }
          ]
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve({
              url: result.secure_url,
              publicId: result.public_id
            });
          }
        }
      ).end(file.buffer);
    });
  } catch (error) {
    throw new Error('Failed to upload image');
  }
};

// Delete image from Cloudinary
export const deleteFromCloudinary = async (publicId) => {
  try {
    await cloudinary.uploader.destroy(publicId);
    return true;
  } catch (error) {
    throw new Error('Failed to delete image');
  }
};
