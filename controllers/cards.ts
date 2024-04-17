import { Request, Response } from "express";
import Card from "../models/card";
export const getCards = async (req: Request, res: Response) => {
  try {
    const cards = await Card.find();
    res.json(cards);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
export const createCard = async (req: Request, res: Response) => {
  const { name, link } = req.body;
  const ownerId = req.user._id;
  try {
    const newCard = await Card.create({ name, link, owner: ownerId });
    res.status(201).json(newCard);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

export const delCard = async (req: Request, res: Response) => {
  const cardId = req.body._id;
  try {
    const card = await Card.findByIdAndDelete(cardId);
    if (card) {
      res.json(card);
    } else {
      res.status(404).json({ message: "Карточка не найдена" });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
export const likeCard = async (req: Request, res: Response) => {
  try {
    const likeCard = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true }
    );
    if (likeCard) {
      res.json(likeCard);
    } else {
      res.status(404).json({ message: "Карточка не найдена" });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const dislikeCard = async (req: Request, res: Response) => {
  try {
    const likeCard = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true }
    );
    if (likeCard) {
      res.json(likeCard);
    } else {
      res.status(404).json({ message: "Карточка не найдена" });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
