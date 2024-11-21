import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl } = req;
    const forwarded = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const url = req.get("Referer");
    
    
    console.log(`[Request] Method: ${method}, URL: ${originalUrl}, From: ${forwarded} - ${url}`);
    next(); // Llama al siguiente middleware/controlador
  }
}
