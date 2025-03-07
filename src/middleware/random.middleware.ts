import { Injectable, NestMiddleware, } from '@nestjs/common'; // Import NestMiddlewar
import { NextFunction } from 'express';

@Injectable() 
export class RandomMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log("Random Middleware");
    next();
  }
}