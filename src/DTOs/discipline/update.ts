import { z } from 'zod';

export const DisciplineUpdateDTO = z.object({
  code: z.string(),
  name: z.string(),
  professor: z.string(),
  course: z.string(),
  center: z.string(),
  period: z.number().min(1).optional(),
  type: z.enum(['MANDATORY', 'ELECTIVE_PROFILE', 'ELECTIVE_FREE']),
  hours: z.number().min(1),
}).partial();
