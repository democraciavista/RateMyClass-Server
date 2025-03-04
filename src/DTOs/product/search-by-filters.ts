import { z } from 'zod';

export const ProductSearchByFiltersSchema = z
  .object({
    name: z.string(),
    maxPrice: z.coerce.number(),
    minPrice: z.coerce.number(),
    stock: z.coerce.number().int({
      message: 'O campo estoque deve ser um número inteiro.',
    }),
  })
  .partial();
