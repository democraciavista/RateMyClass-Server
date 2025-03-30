import prisma from '@database';
import { $Enums, Prisma, Reaction } from '@prisma/client';
import { IReactionRepository } from '@repositories/interface/reaction-repository';

export class PrismaReactionRepository implements IReactionRepository {
  async create(data: Prisma.ReactionUncheckedCreateInput) {
    const reaction = await prisma.reaction.create({ data });
    return reaction;
  }

  async findById(id: string) {
    const reaction = await prisma.reaction.findUnique({ where: { id } });
    return reaction;
  }

  async delete(id: string) {
    const reaction = await prisma.reaction.delete({ where: { id } });
    return reaction;
  }

  async update(id: string, data: Prisma.ReactionUpdateInput) {
    const reaction = await prisma.reaction.update({ where: { id }, data });

    return reaction;
  }

  async findAll() {
    const reactions = await prisma.reaction.findMany();
    return reactions;
  }
  async findByFiltres(data: {
    type?: $Enums.ReactionType | null;
    userId?: string | null;
    materialId?: string | null;
    disciplineId?: string | null;
    reviewId?: string | null;
  }) {
    const { type, userId, materialId, disciplineId, reviewId } = data;
    const reactions = await prisma.reaction.findMany({
      where: {
        type: type ? { equals: type } : undefined,
        userId: userId ? { equals: userId } : undefined,
        materialId: materialId ? { equals: materialId } : undefined,
        disciplineId: disciplineId ? { equals: disciplineId } : undefined,
        reviewId: reviewId ? { equals: reviewId } : undefined,
      },
    });

    return reactions;
  }
}
