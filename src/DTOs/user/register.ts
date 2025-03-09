import { z } from 'zod';

export const UserRegisterSchema = z.object({
  email: z
    .string({
      invalid_type_error: 'O e-mail precisa ser uma string',
      required_error: 'O e-mail é obrigatório',
    })
    .email({
      message: 'O e-mail precisa ser válido',
    }),
  password: z
    .string({
      invalid_type_error: 'A senha precisa ser uma string',
      required_error: 'A senha é obrigatória',
    })
    .min(8, {
      message: 'A senha precisa ter no mínimo 6 caracteres',
    }),
    course: z.string({
      invalid_type_error: 'O curso precisa ser uma string',
      required_error: 'O curso é obrigatório',
    }),
});
