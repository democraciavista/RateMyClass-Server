import { z } from 'zod';

export const VerifyPasswordSchema = z.object({
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
  newPassword: z
    .string({
      required_error: 'A nova senha é obrigatória',
    })
    .min(8, {
      message: 'A senha precisa ter no mínimo 8 caracteres',
    }),
});
