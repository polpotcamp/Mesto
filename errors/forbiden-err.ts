import { HTTP_STATUS_FORBIDDEN} from './errors';
class ForbiddenError extends Error {
  public statusCode: number;
  constructor(message: string) {
    super(message);
    this.statusCode = HTTP_STATUS_FORBIDDEN;
  }
}
export default ForbiddenError;