import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import { celebrate, Joi } from 'celebrate';
import userRouter from '../routes/users';
import cardRouter from '../routes/cards';
import { login, createUser } from '../controllers/users';

const { errors } = require('celebrate');
const handleError = require('../middlewares/handleError');

const { requestLogger, errorLogger } = require('../middlewares/logger');

const { PORT = 3000 } = process.env;
const app = express();
mongoose.connect('mongodb://127.0.0.1:27017/mestodb ');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(requestLogger);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});
app.use('/', userRouter);
app.use('/', cardRouter);
app.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
  }),
  login,
);
app.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().regex(
        /https?:\/\/(www\.)?[a-zA-Z0-9.-]+\.[a-z]{2,}(\/[^ ]*)?#?$/,
      ),
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
  }),
  createUser,
);
app.use(errorLogger);
app.use(errors());
app.use(handleError);
app.listen(PORT, () => {
  console.log('Ссылка на сервер');
});
