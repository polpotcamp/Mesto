import { Request, Response, NextFunction } from 'express';
import { HTTP_STATUS_CREATED, HTTP_STATUS_OK } from '../errors/errors';
import Card from '../models/card';
import BadRequestError from '../errors/bad-request-err';
import ForbiddenError from '../errors/forbiden-err';
import NotFoundError from '../errors/not-found-err';

export const getCards = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const cards = await Card.find();
    return res.status(HTTP_STATUS_OK).send({ data: cards });
  } catch (err) {
    return next(err);
  }
};
export const createCard = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { name, link } = req.body;
  const ownerId = req.user._id;
  try {
    const newCard = await Card.create({ name, link, owner: ownerId });
    return res.status(HTTP_STATUS_CREATED).send({ data: newCard });
  } catch (error: any) {
    if (error.name === 'ValidationError') {
      next(
        new BadRequestError(
          'Переданы некорректные данные в методы создания карточки',
        ),
      );
    } else {
      return next(error);
    }
  }
};

export const delCard = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const cardId = req.body._id;
  const authorization = req.headers.authorization as string;
  try {
    const card = await Card.findById(cardId);
    if (!card) {
      throw new NotFoundError(
        'Карточка не найдена или был запрошен несуществующий роут',
      );
    }
    if (card.owner.toString() !== authorization) {
      throw new ForbiddenError('У вас нет прав для удаления этой карточки');
    }
    const delcard = await Card.findByIdAndDelete(cardId);
    if (delcard) {
      return res.status(HTTP_STATUS_OK).send({ data: card });
    } else {
      throw new NotFoundError(
        'Карточка не найдена или был запрошен несуществующий роут',
      );
    }
  } catch (err) {
    return next(err);
  }
};
export const likeCard = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const likeCard = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    );
    if (likeCard) {
      return res.status(HTTP_STATUS_OK).send({ data: likeCard });
    } else {
      throw new NotFoundError(
        'Карточка не найдена или был запрошен несуществующий роут',
      );
    }
  } catch (err) {
    return next(err);
  }
};

export const dislikeCard = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const likeCard = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    );
    if (likeCard) {
      return res.status(HTTP_STATUS_OK).send({ data: likeCard });
    } else {
      throw new NotFoundError(
        'Карточка не найдена или был запрошен несуществующий роут',
      );
    }
  } catch (err) {
    return next(err);
  }
};
