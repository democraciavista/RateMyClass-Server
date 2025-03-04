import { z } from 'zod';

export const OrderUpdateSchema = z.object({
  status: z.enum(
    ['OPENED', 'RECEIVED', 'PREPARING', 'DISPATCHED', 'DELIVERED'],
    {
      invalid_type_error: 'O status informado é inválido.',
    },
  ),
});
