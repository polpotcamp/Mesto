import { HTTP_STATUS_NOT_FOUND } from './errors';
class NotFoundError extends Error {
  public statusCode: number;
  constructor(message: string) {
    super(message);
    this.statusCode = HTTP_STATUS_NOT_FOUND;
  }
}
export default NotFoundError;
