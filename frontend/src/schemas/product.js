import { z } from 'zod';
import { nameDTOSchema } from './productTypes.js';

export const createProductSchema = z.object(
  {
    name: nameDTOSchema,
  }
);

export const updateProductSchema = z.object(
  {
    name: nameDTOSchema,
  }
);