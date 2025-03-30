import { z } from 'zod';

export const ReviewRegisterSchema = z.object({
  disciplineId: z.string().uuid(),
  userId: z.string().uuid(),
  finalGrade: z
    .number()
    .min(0, 'A Nota deve ser entre 0 e 10')
    .max(10, 'A Nota deve ser entre 0 e 10'),
  professorTeachingScore: z
    .number()
    .min(0, 'A Nota deve ser entre 0 e 10')
    .max(10, 'A Nota deve ser entre 0 e 10'),
  periodPaid: z.string(),
  droppedOut: z.boolean(),
  passedFirstTry: z.boolean(),
  difficultyLevel: z
    .number()
    .min(0, 'A Nota deve ser entre 0 e 10')
    .max(10, 'A Nota deve ser entre 0 e 10'),
  disciplineScore: z
    .number()
    .min(0, 'A Nota deve ser entre 0 e 10')
    .max(10, 'A Nota deve ser entre 0 e 10'),
  comment: z.string(),
  recommendation: z.string(),
});
