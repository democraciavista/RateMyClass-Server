import { z } from 'zod';

export const ReactionRegisterSchema = z.union([
  z.object({
    type: z.literal('REPORT'),
    materialId: z.string(),
    userId: z.string(),
  }),
  z.object({
    type: z.literal('LIKE'),
    materialId: z.string(),
    userId: z.string(),
  }),
  z
    .object({
      type: z.literal('FAVORITE'),
      materialId: z.string().optional(),
      disciplineId: z.string().optional(),
      userId: z.string(),
    })
    .refine(
      (data) => {
        return (
          ((data.materialId && data.disciplineId) ||
            (!data.materialId && !data.disciplineId)) === false
        );
      },
      {
        message:
          'você deve passar apenas um dos dois campos: materialId ou disciplineId',
      },
    ),
]);
