import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createEstatistica = async (
  disciplinaId: string,
  totalAvaliacoes: number,
  mediaNotas: number,
  mediaNotaDidatica: number,
  mediaNivelDificuldade: number,
  taxaDesistencia: number,
  notaDisciplina: number,
  taxaAprovacao: number
) => {
  return prisma.estatistica.create({
    data: {
      disciplinaId,
      totalAvaliacoes,
      mediaNotas,
      mediaNotaDidatica,
      mediaNivelDificuldade,
      taxaDesistencia,
      notaDisciplina,
      taxaAprovacao,
    },
  });
};

export const getEstatisticasByDisciplinaId = async (disciplinaId: string) => {
  return prisma.estatistica.findMany({
    where: { disciplinaId },
  });
};