import { z } from 'zod';

export const OrderSearchByFiltersSchema = z
  .object({
    consumerId: z.string({
      invalid_type_error: 'O id do consumidor deve ser uma string.',
    }),
    maxDate: z.coerce.date({
      invalid_type_error: 'A data máxima deve ser uma data válida.',
    }),
    maxPrice: z.coerce.number({
      invalid_type_error: 'O preço máximo deve ser um número.',
    }),
    minDate: z.coerce.date({
      invalid_type_error: 'A data mínima deve ser uma data válida.',
    }),
    minPrice: z.coerce.number({
      invalid_type_error: 'O preço mínimo deve ser um número.',
    }),
    status: z.enum(
      ['OPENED', 'RECEIVED', 'PREPARING', 'DISPATCHED', 'DELIVERED'],
      {
        invalid_type_error: 'O status informado é inválido.',
      },
    ),
  })
  .partial();
