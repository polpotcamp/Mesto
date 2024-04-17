import { getCards,createCard,delCard , likeCard, dislikeCard} from "../controllers/cards";
import express from "express";
const router = express.Router();
router.post('/cards', createCard);
router.get('/cards', getCards);
router.delete('/cards/:cardId', delCard)
router.put('/cards/:cardId/likes', likeCard)
router.delete('/cards/:cardId/likes', dislikeCard)
export default router;