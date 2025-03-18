import { Prisma, Subjects } from "@prisma/client";

export interface ISubjectRepository {
  create: (data: Prisma.SubjectsUncheckedCreateInput) => Promise<Subjects>;
  findById: (id: string) => Promise<Subjects | null>;
  delete: (id: string) => Promise<Subjects>;
  update: (id: string, data: Prisma.SubjectsUpdateInput) => Promise<Subjects>;

  findAll: () => Promise<Subjects[]>;
}
