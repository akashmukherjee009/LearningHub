const errorHandler = (error, req, res, next) => {
  const statusCode = error.statusCode || (res.statusCode === 200 ? 500 : res.statusCode);

  res.status(statusCode).json({
    message: error.message,
    stack: process.env.NODE_ENV === 'production' ? undefined : error.stack,
  });
};

export default errorHandler;
