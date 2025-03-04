import { z } from 'zod';

export const AuthenticateSchema = z.object({
  email: z
    .string({
      invalid_type_error: 'Email deve ser uma string',
      required_error: 'Email é obrigatório',
    })
    .email({
      message: 'Formato de email inválido',
    }),
  password: z.string({
    invalid_type_error: 'Senha deve ser uma string',
    required_error: 'Senha é obrigatória',
  }),
});
