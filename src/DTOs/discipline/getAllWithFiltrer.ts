import { z } from 'zod';

export const DisciplineGetAllWithFiltrerDTO = z.object({
  userId: z.string(),
  code: z.string(),
  name: z.string(),
  professor: z.string(),
  course: z.string(),
  center: z.string(),
  period: z.number().min(1),
  type: z.enum(['MANDATORY', 'ELECTIVE_PROFILE', 'ELECTIVE_FREE']),
  ordem: z.enum(['asc', 'desc']),
  ordemBy: z.string()
}).partial();
