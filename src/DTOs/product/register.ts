import { z } from 'zod';

export const ProductRegisterSchema = z.object({
  name: z.string({
    invalid_type_error: 'Nome precisa ser uma string',
    required_error: 'Nome é obrigatório',
  }),
  price: z.number({
    invalid_type_error: 'Preço precisa ser um número',
    required_error: 'Preço é obrigatório',
  }),
  stock: z
    .number({
      invalid_type_error: 'Estoque precisa ser um número',
      required_error: 'Estoque é obrigatório',
    })
    .int({
      message: 'Estoque precisa ser um número inteiro',
    }),
  description: z.string({
    invalid_type_error: 'Descrição precisa ser uma string',
    required_error: 'Descrição é obrigatória',
  }),
});
