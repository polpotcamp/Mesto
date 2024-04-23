import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { HTTP_STATUS_CREATED, HTTP_STATUS_OK } from '../errors/errors';
import User from '../models/user';
import BadRequestError from '../errors/bad-request-err';
import NotFoundError from '../errors/not-found-err';
import UnauthorizedError from '../errors/unauthorized-err';
import ConflictError from '../errors/conflict-err';

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { name, avatar, about, email, password } = req.body;
  try {
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      avatar,
      about,
      email,
      password: hashPassword,
    });
    if (!newUser) {
      throw new BadRequestError(
        'Переданы некорректные данные в методы создания пользователя',
      );
    }
    return res.status(HTTP_STATUS_CREATED).send({ data: newUser });
  } catch (error: any) {
    if (error.code === 11000) {
      next(
        new ConflictError(
          'Переданы некорректные данные в методы создания пользователя',
        ),
      );
    }
    return next(error);
  }
};
export const getUserMe = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { authorization } = req.headers;
    const user = await User.findById(authorization);
    if (user) {
      return res.status(HTTP_STATUS_OK).send({ data: user });
    } else {
      throw new NotFoundError(
        'Пользователь не найден или был запрошен несуществующий роут',
      );
    }
  } catch (err) {
    return next(err);
  }
};
export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const users = await User.find();
    return res.status(HTTP_STATUS_OK).send({ data: users });
  } catch (err) {
    return next(err);
  }
};

export const getUserbyId = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = await User.findById(req.params.userId);
    if (user) {
      return res.status(HTTP_STATUS_OK).send({ data: user });
    } else {
      throw new NotFoundError(
        'Пользователь не найден или был запрошен несуществующий роут',
      );
    }
  } catch (err) {
    return next(err);
  }
};
export const updateUserMe = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.headers.authorization;
    const { name, about } = req.body;
    const user = await User.findByIdAndUpdate(userId, { name, about });
    if (user) {
      return res.status(HTTP_STATUS_OK).send({ data: user });
    } else {
      throw new NotFoundError(
        'Пользователь не найден или был запрошен несуществующий роут',
      );
    }
  } catch (err) {
    return next(err);
  }
};
export const updateUserMeAvatar = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.headers.authorization;
    const { avatar } = req.body;
    const user = await User.findByIdAndUpdate(userId, { avatar });
    if (user) {
      return res.status(HTTP_STATUS_OK).send({ data: user });
    } else {
      throw new NotFoundError(
        'Пользователь не найден или был запрошен несуществующий роут',
      );
    }
  } catch (err) {
    return next(err);
  }
};
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new UnauthorizedError('Неверный email или пароль');
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new UnauthorizedError('Неверный email или пароль');
    }
    const payload = {
      _id: user._id,
    };
    const token = jwt.sign(payload, 'your_secret_key', { expiresIn: '7d' });
    res.cookie('jwt', token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.status(HTTP_STATUS_OK).json({ token });
  } catch (err) {
    return next(err);
  }
};
