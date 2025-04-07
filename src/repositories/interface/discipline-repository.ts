import {
  Prisma,
  Discipline,
  $Enums,
  Statistic,
  Reaction,
  Review,
} from '@prisma/client';

export interface IDisciplineRepository {
  create: (data: Prisma.DisciplineUncheckedCreateInput) => Promise<Discipline>;
  findById: (id: string) => Promise<
    | (Discipline & {
        reviews: Review[];
        statistics: Statistic | null;
      })
    | null
  >;
  findByName: (name: string) => Promise<Discipline[]>;
  delete: (id: string) => Promise<Discipline>;
  update: (
    id: string,
    data: Prisma.DisciplineUpdateInput,
  ) => Promise<Discipline>;
  findByFiltres: (
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
  ) => Promise<
    (Discipline & {
      reactions: Reaction[];
      statistics: Statistic | null;
    })[]
  >;
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
  ) => Promise<
    (Discipline & {
      reactions: Reaction[];
      statistics: Statistic | null;
    })[]
  >;
  findAll: () => Promise<Discipline[]>;
  findDisciplineWtithReview: (
    disciplineId: string,
    userId: string,
  ) => Promise<Discipline | null>;
}
