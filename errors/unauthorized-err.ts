import { HTTP_STATUS_UNAUTHORIZED } from './errors';
class UnauthorizedError extends Error {
  public statusCode: number;
  constructor(message: string) {
    super(message);
    this.statusCode = HTTP_STATUS_UNAUTHORIZED;
  }
}
export default UnauthorizedError;
