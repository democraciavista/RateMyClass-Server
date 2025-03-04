import { z } from 'zod';

export const OrderItemUpdateSchema = z.object({
  quantity: z.number({
    invalid_type_error: 'A quantidade deve ser um número.',
  }),
});
