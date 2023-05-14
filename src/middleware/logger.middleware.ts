import { Request, Response, NextFunction } from 'express';
import * as winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  defaultMeta: { service: 'my-nestjs-app' },
  transports: [
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/app.log' })
  ]
});

export function loggerMiddleware(req: Request, res: Response, next: NextFunction) {
  const requestMessage = `Request: ${req.method} ${req.originalUrl}`;
  logger.info(requestMessage);
  
  // Add an error event listener to the response object
  res.on('finish', () => {
    const responseMessage = `Response: ${res.statusCode}`;
    if (res.statusCode >= 400) {
      logger.error(responseMessage);
    } else {
      logger.info(responseMessage);
    }
  });


  next();
};

export default loggerMiddleware;
