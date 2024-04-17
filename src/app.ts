import express from "express";
import { Request, Response, NextFunction } from "express";
import path from "path";
import mongoose from "mongoose";
import userRouter from '../routes/users'
import cardRouter from '../routes/cards'
const { PORT = 3000} = process.env;
const app = express();
mongoose.connect("mongodb://127.0.0.1:27017/mestodb ");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.listen(PORT, () => {
  console.log("Ссылка на сервер");
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});
app.use('/', userRouter);
app.use('/', cardRouter);
app.use((req:Request, res:Response, next: NextFunction) => {
  req.user = {
    _id: '661e827eb4655d7ca22c0811'
  };
  next();
});
