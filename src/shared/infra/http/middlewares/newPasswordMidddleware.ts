import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'

import 'dotenv/config';

import { AppError } from '@shared/errors/AppError';

interface TokenPayLoad {
  uid: string
}

async function newPasswordMiddleware(request: Request, response: Response, next: NextFunction) {
  const auth = request.headers.authorization;
  if (!auth) {
    throw new AppError("Token missing!", 401)
  }



  const [, token] = auth.split(" ");
  
  try {
    const data = verify(token, process.env.API_NEW_PASSWD);

    const { uid } = data as TokenPayLoad;

    request.userId = uid
    return next()

  } catch {
    throw new AppError("Invalid Token!", 401)
  }
}

export { newPasswordMiddleware }