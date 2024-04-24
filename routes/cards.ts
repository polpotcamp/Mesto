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
  auth,
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required(),
    }),
  }),
  createCard,
);
router.get('/cards', auth, getCards);
router.delete(
  '/cards/:cardId',
  auth,
  celebrate({
    body: Joi.object().keys({
      _id: Joi.string(),
    }),
  }),
  delCard,
);
router.put(
  '/cards/:cardId/likes',
  auth,
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string(),
    }),
  }),
  likeCard,
);
router.delete(
  '/cards/:cardId/likes',
  auth,
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string(),
    }),
  }),
  dislikeCard,
);
export default router;
