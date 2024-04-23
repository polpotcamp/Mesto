import { HTTP_STATUS_CONFLICT } from './errors';
class ConflictError extends Error {
  public statusCode: number;
  constructor(message: string) {
    super(message);
    this.statusCode = HTTP_STATUS_CONFLICT;
  }
}
export default ConflictError;
