import { z } from 'zod';

export const DisciplineGetAllFavoriteWithFiltrerDTO = z.object({
  userId: z.string(),
  code: z.string().optional(),
  name: z.string().optional(),
  professor: z.string().optional(),
  course: z.string().optional(),
  center: z.string().optional(),
  period: z.number().min(1).optional(),
  type: z.enum(['MANDATORY', 'ELECTIVE_PROFILE', 'ELECTIVE_FREE']).optional(),
  ordem: z.enum(['asc', 'desc']).optional(),
  ordemBy: z.string().optional(),
});
  
