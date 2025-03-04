import { z } from 'zod';

export const GenerateSalesReportSchema = z.object({
  maxDate: z.coerce.date(),
  minDate: z.coerce.date(),
});
