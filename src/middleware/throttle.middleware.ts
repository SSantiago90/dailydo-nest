import { Injectable, NestMiddleware, } from '@nestjs/common'; // Import NestMiddlewar
import { NextFunction } from 'express';

@Injectable() 
export class ThrottleMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    setTimeout(() => next(), 1000);
  }
}