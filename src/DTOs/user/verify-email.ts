import { z } from 'zod';

export const VerifyEmailSchema = z.object({
  token: z.string({
    invalid_type_error: 'O token precisa ser uma string',
    required_error: 'O token é obrigatório',
  }),
  email: z
    .string({
      invalid_type_error: 'O e-mail precisa ser uma string',
      required_error: 'O e-mail é obrigatório',
    })
    .email({
      message: 'O e-mail precisa ser válido',
    }),
});
