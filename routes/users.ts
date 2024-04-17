import express from "express";
import { createUser, getUsers, getUserbyId, updateUserMe, updateUserMeAvatar } from "../controllers/users";
const router = express.Router();
router.post('/users', createUser);
router.get('/users', getUsers);
router.get('/users/:userId', getUserbyId)
router.get('/users/me', updateUserMe)
router.get('/users/me/avatar', updateUserMeAvatar)
export default router;
