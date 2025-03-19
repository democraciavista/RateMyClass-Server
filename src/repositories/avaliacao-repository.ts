import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createAvaliacao = async (
  disciplinaId: string,
  usuarioId: string,
  curso: string,
  codigo: string,
  passouDePrimeira: boolean,
  mediaFinal: number,
  notaDidaticaProfessor: number,
  periodoQuePagou: string,
  nomeDisciplina: string,
  cargaHoraria: string,
  professor: string,
  desistiuDaCadeira: boolean,
  nivelDificuldade: number,
  comentario: string,
  recomendacao: string
) => {
  return prisma.avaliacao.create({
    data: {
      disciplinaId,
      usuarioId,
      curso,
      codigo,
      passouDePrimeira,
      mediaFinal,
      notaDidaticaProfessor,
      periodoQuePagou,
      nomeDisciplina,
      cargaHoraria,
      professor,
      desistiuDaCadeira,
      nivelDificuldade,
      comentario,
      recomendacao,
    },
  });
};

export const getAvaliacoesByDisciplinaId = async (disciplinaId: string) => {
  return prisma.avaliacao.findMany({
    where: { disciplinaId },
    include: { usuario: true }, // Inclui informações do usuário
  });
};