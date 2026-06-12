import express from 'express';
import {
  createUser,
  getUsers,
  loginUser,
  updateUser,
} from '../controller/userController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', getUsers);
router.post('/', createUser);
router.post('/login', loginUser);
router.patch('/me', auth, updateUser);

export default router;
