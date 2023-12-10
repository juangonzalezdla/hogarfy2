import { z } from 'zod';

export const nameDTOSchema = z
  .string()
  .min(2,
    { message: 'Mínimo 2 caracteres de longitud' })
  .max(50,
    { message: 'Máximo 50 caracteres de longitud' }
  );