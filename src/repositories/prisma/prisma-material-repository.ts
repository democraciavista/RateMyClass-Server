import prisma from '@database';
import { Material, Prisma } from '@prisma/client';
import { IMaterialRepository } from '@repositories/interface/material-repository';

export class PrismaMaterialRepository implements IMaterialRepository {
  async create(data: Prisma.MaterialUncheckedCreateInput) {
    const material = await prisma.material.create({ data });

    return material;
  }

  async findById(id: string) {
    const material = await prisma.material.findUnique({ where: { id } });

    return material;
  }

  async findByTitle(title: string) {
    const material = await prisma.material.findMany({
      where: {
        title: {
          contains: title,
        },
      },
    });

    return material;
  }

  async delete(id: string) {
    const material = await prisma.material.delete({ where: { id } });

    return material;
  }

  async update(id: string, data: Prisma.MaterialUpdateInput) {
    const material = await prisma.material.update({ where: { id }, data });

    return material;
  }

  async findByFiltres(
    title?: string,
    disciplina?: string,
    curso?: string,
    professor?: string,
    ordem?: Prisma.SortOrder,
    ordemBy?: string,
  ): Promise<Material[]> {
    const materials = await prisma.material.findMany({
      where: {
        title: title ? { contains: title } : undefined,
        subject: {
          name: disciplina ? { contains: disciplina } : undefined,
          couse: curso ? { contains: curso } : undefined,
          professor: professor ? { contains: professor } : undefined,
        },
      },
      orderBy: {
        [ordemBy || 'createdAt']: ordem || 'asc',
      },
    });

    return materials;
  }
  async findFavoriteByFiltres(
    userId: string,
    title?: string,
    disciplina?: string,
    curso?: string,
    professor?: string,
    ordem?: Prisma.SortOrder,
    ordemBy?: string,
  ): Promise<Material[]> {
    const materials = await prisma.material.findMany({
      where: {
        title: title ? { contains: title } : undefined,
        subject: {
          name: disciplina ? { contains: disciplina } : undefined,
          couse: curso ? { contains: curso } : undefined,
          professor: professor ? { contains: professor } : undefined,
        },
        reactions: {
          some: {
            AND: {
              userId: userId,
              type: 'FAVORITE',
            },
          },
        },
      },
      orderBy: {
        [ordemBy || 'createdAt']: ordem || 'asc',
      },
    });

    return materials;
  }

  async findAll(): Promise<Material[]> {
    const materials = await prisma.material.findMany();

    return materials;
  }
}
