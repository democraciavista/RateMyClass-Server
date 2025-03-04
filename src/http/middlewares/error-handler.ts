import { Request, Response, NextFunction } from 'express';
import { JsonWebTokenError } from 'jsonwebtoken';
import { ZodError } from 'zod';

import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

import { AlreadyExistsError } from '@errors/already-exists-error';
import { ForbiddenError } from '@errors/forbidden-error';
import { InvalidCredentialsError } from '@errors/invalid-credentials-error';
import { InvalidTokenError } from '@errors/invalid-token-error';
import { SendMailError } from '@errors/send-mail-error';
import { UnauthorizedError } from '@errors/unauthorized-error';
import { NotFoundError } from '@errors/not-found-error';

const errorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  process.env.NODE_ENV === 'development' && console.error(err);

  let statusCode = 500;
  let message = 'Erro no servidor, tente novamente mais tarde.';

  if (err instanceof ZodError) {
    statusCode = 400;
    message = err.issues.map((issue) => issue.message).join(', ');
  }

  if (err instanceof JsonWebTokenError) {
    statusCode = 401;
    message = err.message;
  }

  if (err instanceof AlreadyExistsError) {
    statusCode = 409;
    message = err.message;
  }

  if (err instanceof ForbiddenError) {
    statusCode = 403;
    message = err.message;
  }

  if (err instanceof InvalidCredentialsError) {
    statusCode = 400;
    message = err.message;
  }

  if (err instanceof InvalidTokenError) {
    statusCode = 400;
    message = err.message;
  }

  if (err instanceof SendMailError) {
    statusCode = 503;
    message = err.message;
  }

  if (err instanceof UnauthorizedError) {
    statusCode = 401;
    message = err.message;
  }

  if (err instanceof NotFoundError) {
    statusCode = 404;
    message = err.message;
  }

  if (err instanceof PrismaClientKnownRequestError) {
    statusCode = 400;
    message = err.message;

    if (err.code === 'P2025') {
      statusCode = 404;
      message = 'Não encontrado.';
    }
  }

  return res.status(statusCode).json({ message });
};

export default errorHandler;
