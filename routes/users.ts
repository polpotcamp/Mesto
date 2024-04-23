import express from 'express';
import { celebrate, Joi } from 'celebrate';
import {
  getUsers,
  getUserbyId,
  updateUserMe,
  updateUserMeAvatar,
  getUserMe,
} from '../controllers/users';

const auth = require('../middlewares/auth');

const router = express.Router();
router.get('/users', auth, getUsers);
router.get(
  '/users/:userId',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string(),
    }),
  }),
  getUserbyId,
);
router.patch(
  '/users/me',
  celebrate({
    headers: Joi.object().keys({
      authorization: Joi.string(),
    }),
  }),
  auth,
  updateUserMe,
);
router.patch(
  '/users/me/avatar',
  celebrate({
    headers: Joi.object().keys({
      authorization: Joi.string(),
    }),
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
    }),
  }),
  auth,
  updateUserMeAvatar,
);
router.get(
  '/users/me',
  celebrate({
    headers: Joi.object().keys({
      authorization: Joi.string(),
    }),
    body: Joi.object().keys({
      avatar: Joi.string().regex(
        /https?:\/\/(www\.)?[a-zA-Z0-9.-]+\.[a-z]{2,}(\/[^ ]*)?#?$/,
      ),
    }),
  }),
  auth,
  getUserMe,
);
export default router;
