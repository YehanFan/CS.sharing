require("dotenv").config();

const config = {
  cors: {
    origin: process.env.CLIENT_URL,
    credentials: true,
    preflightContinue: true,
  },
  cloudinary: {
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  },
  jwtSecrets: {
    access: process.env.JWT_ACCESS_SECRET,
    refresh: process.env.JWT_REFRESH_SECRET,
  },
  mongoDB: {
    uri: process.env.MONGO_URI,
  },
  server: {
    port: process.env.PORT || 8000,
  },
};

module.exports = config;
