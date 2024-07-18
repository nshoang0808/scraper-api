import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    res.on("finish", () => {
      const { statusCode } = res;
      const contentLength = res.get("content-length");
      console.log(`req:`, {
        method: req.method.toUpperCase(),
        statusCode,
        contentLength,
        headers: req.headers,
        body: req.body,
        originalUrl: req.originalUrl,
      })
    })
    if (next) {
      next();
    }
  }
}