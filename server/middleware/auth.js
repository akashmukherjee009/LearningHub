import jwt from 'jsonwebtoken';
import User from '../model/User.js';

const auth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401);
      throw new Error('Authentication token is required');
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'learninghub-dev-secret',
    );

    const user = await User.findById(decoded.id);

    if (!user) {
      res.status(401);
      throw new Error('User no longer exists');
    }

    req.user = {
      id: user._id,
      role: user.role,
    };

    next();
  } catch (error) {
    if (!res.statusCode || res.statusCode === 200) {
      res.status(401);
    }

    next(error);
  }
};

export default auth;
