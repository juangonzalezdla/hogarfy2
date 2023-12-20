import { z } from 'zod';

export const emailDTOSchema = z
  .string()
  .email(
    { message: 'Email es Requerido' }
  );

export const passwordDTOSchema = z
  .string()
  .min(10, 
    { message: 'Mínimo 10 caracteres de longitud' })
  .max(25, 
    { message: 'Máximo 25 caracteres de longitud' })
  .refine((value) => /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/.test(value), 
    { message: 'Mínimo: Una mayúscula, una minúscula y un número' }
  );