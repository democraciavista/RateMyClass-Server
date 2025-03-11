import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createMaterial = async (
  disciplinaId: string,
  titulo: string,
  descricao: string,
  url: string
) => {
  return prisma.material.create({
    data: {
      disciplinaId,
      titulo,
      descricao,
      url,
    },
  });
};

export const getMateriaisByDisciplinaId = async (disciplinaId: string) => {
  return prisma.material.findMany({
    where: { disciplinaId },
  });
};