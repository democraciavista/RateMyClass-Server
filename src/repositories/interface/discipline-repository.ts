import { Prisma, Discipline, $Enums } from '@prisma/client';

export interface IDisciplineRepository {
  create: (data: Prisma.DisciplineUncheckedCreateInput) => Promise<Discipline>;
  findById: (id: string) => Promise<Discipline | null>;
  findByName: (name: string) => Promise<Discipline[]>;
  delete: (id: string) => Promise<Discipline>;
  update: (
    id: string,
    data: Prisma.DisciplineUpdateInput,
  ) => Promise<Discipline>;
  findByFiltres: (
    name?: string,
    code?: string,
    course?: string,
    center?: string,
    period?: number,
    professor?: string,
    type?: $Enums.CourseType,
    ordem?: Prisma.SortOrder,
    ordemBy?: string,
  ) => Promise<Discipline[]>;
  findFavoriteByFiltres: (
    userId: string,
    name?: string,
    code?: string,
    course?: string,
    center?: string,
    period?: number,
    professor?: string,
    type?: $Enums.CourseType,
    ordem?: Prisma.SortOrder,
    ordemBy?: string,
  ) => Promise<Discipline[]>;
  findAll: () => Promise<Discipline[]>;
}
