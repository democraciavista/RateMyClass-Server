import { z } from 'zod';

export const OrderRegisterSchema = z.object({
  consumerId: z.string({
    invalid_type_error: 'O id do cliente deve ser uma string.',
    required_error: 'O id do cliente é obrigatório.',
  }),
});
