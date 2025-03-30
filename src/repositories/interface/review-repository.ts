import { Prisma, Review, $Enums } from '@prisma/client';

export interface IReviewRepository {
  create: (data: Prisma.ReviewUncheckedCreateInput) => Promise<Review>;
  findById: (id: string) => Promise<Review | null>;
  delete: (id: string) => Promise<Review>;
  update: (
    id: string,
    data: Prisma.ReviewUncheckedUpdateInput,
  ) => Promise<Review>;
  findAll: () => Promise<Review[]>;
  findByDisciplineId: (disciplineId: string) => Promise<Review[]>;
  findByFiltres: (data: Prisma.ReviewWhereInput) => Promise<Review[]>;
}
