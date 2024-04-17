import { model, Model, Schema } from "mongoose";
export interface IUser {
  name: string;
  about: string;
  avatar: string;
}
const userSchema: Schema<IUser> = new Schema<IUser>({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 200,
  },
  avatar: {
    type: String,
    required: true,
  },
});

// Создание модели пользователя на основе схемы
const User: Model<IUser> = model<IUser>("user", userSchema);
export default User;
