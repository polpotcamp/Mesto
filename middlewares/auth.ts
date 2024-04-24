import jwt, { JwtPayload } from 'jsonwebtoken';
import { Response, NextFunction, Request } from 'express';
import UnauthorizedError from '../errors/unauthorized-err';
import { ObjectId } from 'mongoose';
interface SessionRequest extends Request {
  user: {
    _id: string | ObjectId | JwtPayload| undefined;
  };
}

const extractBearerToken = (header: string) => header.replace('Bearer ', '');

function auth(req: SessionRequest, res: Response, next: NextFunction) {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new UnauthorizedError('Необходима авторизация'));
  }
  const token = extractBearerToken(authorization!);
  let payload;
  try {
    payload = jwt.verify(token, 'your_secret_key');
  } catch (err) {
    next(new UnauthorizedError('Необходима авторизация'));
  }
  req.user._id = payload;
  next();
}

module.exports = auth;
