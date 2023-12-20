import { z } from 'zod';
import { emailDTOSchema, passwordDTOSchema } from './userTypes.js';

export const userLoginSchema = z.object(
  {
    email: emailDTOSchema,
    password: passwordDTOSchema
  }
);