import bcryptjs from 'bcryptjs'

import jwt from 'jsonwebtoken'

import { AppError } from '@shared/errors/AppError';

interface TokenPayLoad {
  id: string
}

export async function CompareHash(code : string, token : string): Promise<boolean>{    
  const data = jwt.verify(token, process.env.API_NEW_PASSWD);

  const { id } = data as TokenPayLoad
  const isValidCode = await bcryptjs.compare(code, id);

  if(!isValidCode){
    throw new AppError("Incorrect Code!");
  }
  return isValidCode;
}