import { z } from 'zod';

export const OrderItemRegisterSchema = z.object({
  orderId: z
    .string({
      invalid_type_error: 'O id do pedido deve ser uma string.',
      required_error: 'O id do pedido é obrigatório.',
    })
    .uuid({
      message: 'O id do pedido deve ser um UUID válido.',
    }),
  productId: z
    .string({
      invalid_type_error: 'O id do produto deve ser uma string.',
      required_error: 'O id do produto é obrigatório.',
    })
    .uuid({
      message: 'O id do produto deve ser um UUID válido.',
    }),
  quantity: z.number({
    invalid_type_error: 'A quantidade deve ser um número.',
    required_error: 'A quantidade é obrigatória.',
  }),
});
