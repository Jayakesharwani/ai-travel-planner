import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { env } from '../config/env';

export class AppError extends Error {
  statusCode: number;
  isOperational: boolean;

  constructor(message: string, statusCode: number = 500) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

export function notFoundHandler(
  req: Request,
  _res: Response,
  next: NextFunction
): void {
  next(new AppError(`Route not found: ${req.method} ${req.originalUrl}`, 404));
}

function resolveError(err: Error | AppError): {
  statusCode: number;
  message: string;
} {
  if (err instanceof AppError) {
    return { statusCode: err.statusCode, message: err.message };
  }

  if (err instanceof mongoose.Error.ValidationError) {
    const message = Object.values(err.errors)
      .map((e) => e.message)
      .join(', ');
    return { statusCode: 400, message };
  }

  if ('code' in err && err.code === 11000) {
    return { statusCode: 409, message: 'Email already in use' };
  }

  return {
    statusCode: 500,
    message: env.isProduction ? 'Internal server error' : err.message,
  };
}

export function errorHandler(
  err: Error | AppError,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
 const {statusCode, message} = resolveError(err);
  if (!env.isProduction) {
    console.error('[Error]', err);
  }

  res.status(statusCode).json({
    success: false,
    message,
    
  });
}
