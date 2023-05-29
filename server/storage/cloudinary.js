const config = require("../config/config");
const cloudinary = require("cloudinary").v2;
const multer = require("multer");

cloudinary.config(config.cloudinary); // Configure cloudinary with the provided configuration

const upload = multer({ // Set up multer for handling file uploads
  dest: "uploads/",
  limits: {
    fileSize: 1024 * 1024, // Set the file size limit to 1MB
  },
});

 // Function for uploading image(s) to cloudinary
function uploadImage(file, folder) {
  if (file) {
    return new Promise(async (resolve, reject) => {
      const adminApiOptions = {
        folder,
        resource_type: "auto",
        overwrite: true,
        quality: "auto",
      };

      if (Array.isArray(file)) {
        const req = file.map((img) => {
          return cloudinary.uploader.upload(img.path, adminApiOptions);
        });

        try {
          const result = await Promise.all(req);
          resolve(result);
        } catch (err) {
          reject(err);
        }
      } else {
        try {
          const result = await cloudinary.uploader.upload(
            file.path,
            adminApiOptions
          );
          resolve(result);
        } catch (err) {
          reject(err);
        }
      }
    });
  }
}

// Function for deleting image from cloudinary
function deleteImage(publicId) {
  return new Promise(async (resolve, reject) => {
    const adminApiOptions = {
      folder,
      resource_type: "auto",
      overwrite: true,
      quality: "auto",
    };

    if (Array.isArray(file)) {
      const req = file.map((img) => {
        return cloudinary.uploader.upload(img.path, adminApiOptions);
      });

      try {
        const result = await Promise.all(req);
        resolve(result);
      } catch (err) {
        reject(err);
      }
    } else {
      try {
        const result = await cloudinary.uploader.upload(
          file.path,
          adminApiOptions
        );
        resolve(result);
      } catch (err) {
        reject(err);
      }
    }
  });
}

module.exports = {
  upload,
  uploadImage,
  deleteImage,
};
