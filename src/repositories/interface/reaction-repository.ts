import { Prisma, Reaction, $Enums } from '@prisma/client';

export interface IReactionRepository {
  create: (data: Prisma.ReactionUncheckedCreateInput) => Promise<Reaction>;
  findById: (id: string) => Promise<Reaction | null>;
  delete: (id: string) => Promise<Reaction>;
  update: (id: string, data: Prisma.ReactionUpdateInput) => Promise<Reaction>;
  findAll: () => Promise<Reaction[]>;
  findByFiltres: (data: {
    type?: $Enums.ReactionType;
    userId?: string;

    materialId?: string;
    disciplineId?: string;
  }) => Promise<Reaction[]>;
}
