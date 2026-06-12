import User from '../model/User.js';

const getUsers = () => {
  return User.find().sort({ createdAt: -1 });
};

const createUser = (payload) => {
  return User.create(payload);
};

export default {
  getUsers,
  createUser,
};
