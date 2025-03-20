import { z } from 'zod';

export const ReactionUpdateSchema = z.union([
  z.object({
    type: z.literal('REPORT').optional(), 
    materialId: z.string().optional(),
    userId: z.string().optional(),
  }),

  z.object({
    type: z.literal('LIKE').optional(), 
    materialId: z.string().optional(),
    userId: z.string().optional(),
  }),
  z
    .object({
      type: z.literal('FAVORITE').optional(), 
      materialId: z.string().optional(),
      disciplineId: z.string().optional(),
      userId: z.string().optional(),
    })
    .refine(
      (data) => {
        return (
          (data.materialId && !data.disciplineId) ||
          (!data.materialId && data.disciplineId)
        );
      },
      {
        message:
          'Você deve passar apenas um dos dois campos: materialId ou disciplineId para o tipo FAVORITE',
      },
    ),
]);
