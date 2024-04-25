import express from 'express';
import { celebrate, Joi } from 'celebrate';
import {
  getUsers,
  getUserbyId,
  updateUserMe,
  updateUserMeAvatar,
  getUserMe,
} from '../controllers/users';
import { regularExpression } from '../utils/regularExpression';

const auth = require('../middlewares/auth');

const router = express.Router();
router.get('/users', auth, getUsers);
router.patch(
  '/users/me',
  auth,
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
    }),
  }),
  updateUserMe,
);
router.patch(
  '/users/me/avatar',
  auth,
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().regex(regularExpression),
    }),
  }),
  updateUserMeAvatar,
);
router.get('/users/me', auth, getUserMe);
router.get(
  '/users/:userId',
  auth,
  celebrate({
    params: Joi.object().keys({
      userId: Joi.string().length(24),
    }),
  }),
  getUserbyId,
);

export default router;
