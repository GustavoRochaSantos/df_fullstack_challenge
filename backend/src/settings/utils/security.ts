import { HttpException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

export const getStringHashed = async (text: string) => {
  try {
    const saltOrRounds = 10;
    return await bcrypt.hash(text, saltOrRounds);
  } catch (error) {
    throw new HttpException(error.message, 500);
  }
};
