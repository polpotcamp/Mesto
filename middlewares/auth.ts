import jwt, { JwtPayload } from 'jsonwebtoken';
import { Response, NextFunction, Request } from 'express';
import UnauthorizedError from '../errors/unauthorized-err';

interface SessionRequest extends Request {
  user: string | JwtPayload;
}

const extractBearerToken = (header: string) => header.replace('Bearer ', '');

function auth(req: SessionRequest, res: Response, next: NextFunction) {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return new UnauthorizedError('Необходима авторизация');
  }
  const token = extractBearerToken(authorization);
  let payload;
  try {
    payload = jwt.verify(token, 'your_secret_key');
  } catch (err) {
    return new UnauthorizedError('Необходима авторизация');
  }
  req.user = payload;
  next();
}

module.exports = auth;
