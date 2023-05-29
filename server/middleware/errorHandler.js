const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500; // Get the response status code, default to 500 if not set

  // Set the response status code and send a JSON response with error details
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack, 
  });
};

module.exports = errorHandler;

