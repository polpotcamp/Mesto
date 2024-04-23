import { celebrate, Joi } from 'celebrate';
import express from 'express';

import {
  getCards,
  createCard,
  delCard,
  likeCard,
  dislikeCard,
} from '../controllers/cards';

const auth = require('../middlewares/auth');

const router = express.Router();
router.post(
  '/cards',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required(),
    }),
    headers: Joi.object().keys({
      authorization: Joi.string(),
    }),
  }),
  auth,
  createCard,
);
router.get('/cards', auth, getCards);
router.delete(
  '/cards/:cardId',
  celebrate({
    body: Joi.object().keys({
      _id: Joi.string(),
    }),
    headers: Joi.object().keys({
      authorization: Joi.string(),
    }),
  }),
  auth,
  delCard,
);
router.put(
  '/cards/:cardId/likes',
  celebrate({
    headers: Joi.object().keys({
      authorization: Joi.string(),
    }),
    params: Joi.object().keys({
      cardId: Joi.string(),
    }),
  }),
  auth,
  likeCard,
);
router.delete(
  '/cards/:cardId/likes',
  celebrate({
    headers: Joi.object().keys({
      authorization: Joi.string(),
    }),
    params: Joi.object().keys({
      cardId: Joi.string(),
    }),
  }),
  auth,
  dislikeCard,
);
export default router;
