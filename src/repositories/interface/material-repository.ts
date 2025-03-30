import { type Material, Prisma } from '@prisma/client';

export interface IMaterialRepository {
  create: (data: Prisma.MaterialUncheckedCreateInput) => Promise<Material>;
  findById: (id: string) => Promise<Material | null>;
  findByTitle: (Title: string) => Promise<Material[]>;
  delete: (id: string) => Promise<Material>;
  update: (id: string, data: Prisma.MaterialUpdateInput) => Promise<Material>;
  findByFiltres: (
    title?: string,
    disciplina?: string,
    curso?: string,
    professor?: string,
    ordem?: Prisma.SortOrder,
    ordemBy?: string,
  ) => Promise<Material[]>;
  findFavoriteByFiltres: (
    userId: string, 
    title?: string,
    disciplina?: string,
    curso?: string,
    professor?: string,
    ordem?: Prisma.SortOrder,
    ordemBy?: string,
  ) => Promise<Material[]>;
  findAll: () => Promise<Material[]>;

}
