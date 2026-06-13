const admin = (req, res, next) => {
  if (req.user?.role !== 'admin') {
    const error = new Error('Admin access is required');
    error.statusCode = 403;
    next(error);
    return;
  }

  next();
};

export default admin;
