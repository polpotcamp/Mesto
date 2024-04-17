import { model, Model, Schema, Types, ObjectId } from "mongoose";
export interface ICard {
  name: string;
  link: string;
  owner: ObjectId;
  likes: ObjectId[];
  createdAt: Date;
}
const cardSchema: Schema<ICard> = new Schema<ICard>({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
  },
  owner: {
    type: Types.ObjectId,
    required: true,
  },
  likes: {
    type: [Types.ObjectId],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const Card: Model<ICard> = model<ICard>("Card", cardSchema);
export default Card;
