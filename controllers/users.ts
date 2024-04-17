import { Request, Response } from "express";
import User from "../models/user";
export const createUser = async (req: Request, res: Response) => {
  const { name, avatar, about } = req.body;
  try {
    const newUser = await User.create({ name, avatar, about });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const getUserbyId = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.userId);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "Пользователь не найден" });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
export const updateUserMe = async (req: Request, res: Response) => {
  try {
    const userId = req.user._id;
    const { name, about } = req.body;
    const user = await User.findByIdAndUpdate(userId, { name, about });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "Пользователь не найден" });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
export const updateUserMeAvatar = async (req: Request, res: Response) => {
  try {
    const userId = req.user._id;
    const { avatar } = req.body;
    const user = await User.findByIdAndUpdate(userId, { avatar });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "Пользователь не найден" });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
