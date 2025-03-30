import prisma from '@database';
import { $Enums, Prisma, Review } from '@prisma/client';
import { IReviewRepository } from '@repositories/interface/review-repository';

export class PrismaReviewRepository implements IReviewRepository {
  async create(data: Prisma.ReviewUncheckedCreateInput) {
    const review = await prisma.review.create({ data });
    return review;
  }

  async findById(id: string) {
    const review = await prisma.review.findUnique({ where: { id } });
    return review;
  }
  async findByDisciplineId(disciplineId: string) {
    const reviews = await prisma.review.findMany({
      where: {
        disciplineId,
      },
    });
    return reviews;
  }

  async delete(id: string) {
    const review = await prisma.review.delete({ where: { id } });
    return review;
  }

  async update(id: string, data: Prisma.ReviewUpdateInput) {
    const review = await prisma.review.update({ where: { id }, data });

    return review;
  }

  async findAll() {
    const reviews = await prisma.review.findMany();
    return reviews;
  }
  async findByFiltres(data: Prisma.ReviewWhereInput) {
    const reviews = await prisma.review.findMany({
      where: {
        ...data,
      },
    });
    return reviews;
  }
}
