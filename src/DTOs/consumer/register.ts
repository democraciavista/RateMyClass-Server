import { z } from 'zod';

export const ConsumerRegisterSchema = z.object({
  userId: z
    .string({
      invalid_type_error: 'O id do usuário deve ser uma string.',
      required_error: 'O id do usuário é obrigatório.',
    })
    .uuid({ message: 'O id do usuário deve ser um UUID válido.' }),
  fullName: z.string({
    invalid_type_error: 'O nome completo deve ser uma string.',
    required_error: 'O nome completo é obrigatório.',
  }),
  contact: z.string({
    invalid_type_error: 'O contato deve ser uma string.',
    required_error: 'O contato é obrigatório.',
  }),
  address: z.string({
    invalid_type_error: 'O endereço deve ser uma string.',
    required_error: 'O endereço é obrigatório.',
  }),
  status: z
    .boolean({
      invalid_type_error: 'O status deve ser um booleano.',
    })
    .default(true),
});
