import { Request as ERequest } from 'express';
import { Payload } from '../utility/jwt';

interface Request extends ERequest {
  user?: Payload | any;
}

export { Request };
