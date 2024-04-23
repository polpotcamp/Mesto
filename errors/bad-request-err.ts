import { HTTP_STATUS_BAD_REQUEST } from './errors';
class BadRequestError extends Error {
  public statusCode: number;
  constructor(message: string) {
    super(message);
    this.statusCode = HTTP_STATUS_BAD_REQUEST;
  }
}
export default BadRequestError;
