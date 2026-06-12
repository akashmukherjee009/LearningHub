import User from '../model/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const createToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET || 'learninghub-dev-secret',
    { expiresIn: '7d' },
  );
};

const sanitizeUser = (user) => {
  const userObject = user.toObject();
  delete userObject.password;
  return userObject;
};

const getUsers = () => {
  return User.find({ role: 'student' }).sort({ createdAt: -1 });
};

const createUser = async (payload) => {
  const existingUser = await User.findOne({ email: payload.email });

  if (existingUser) {
    const error = new Error('Email is already registered');
    error.statusCode = 409;
    throw error;
  }

  const hashedPassword = await bcrypt.hash(payload.password, 10);

  const user = await User.create({
    name: payload.name,
    email: payload.email,
    password: hashedPassword,
    role: 'student',
    collegeName: payload.collegeName,
    class: payload.class,
    address: payload.address,
    city: payload.city,
  });

  return sanitizeUser(user);
};

const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    const error = new Error('Invalid email or password');
    error.statusCode = 401;
    throw error;
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    const error = new Error('Invalid email or password');
    error.statusCode = 401;
    throw error;
  }

  return {
    token: createToken(user),
    user: sanitizeUser(user),
  };
};

const updateUser = async (userId, payload) => {
  const allowedFields = ['name', 'collegeName', 'class', 'address', 'city'];
  const updates = {};

  allowedFields.forEach((field) => {
    if (payload[field] !== undefined) {
      updates[field] = payload[field];
    }
  });

  const user = await User.findByIdAndUpdate(userId, updates, {
    new: true,
    runValidators: true,
  });

  if (!user) {
    const error = new Error('User not found');
    error.statusCode = 404;
    throw error;
  }

  return user;
};

export default {
  getUsers,
  createUser,
  loginUser,
  updateUser,
};
