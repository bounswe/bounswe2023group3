import { Payload } from './payload.interface';
import { Request } from 'express';
export interface AuthorizedRequest extends Request {
  user: Payload;
}
