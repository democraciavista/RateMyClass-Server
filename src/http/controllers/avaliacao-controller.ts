import { Request, Response } from 'express';
import { createAvaliacao, getAvaliacoesByDisciplinaId } from '../../repositories/avaliacao-repository';

export const criarAvaliacao = async (req: Request, res: Response) => {
  const {
    disciplinaId,
    usuarioId,
    curso,
    codigo,
    passouDePrimeira,
    mediaFinal,
    notaDidaticaProfessor,
    periodoQuePagou,
    disciplina,
    cargaHoraria,
    professor,
    desistiuDaCadeira,
    nivelDificuldade,
    comentario,
    recomendacao,
  } = req.body;

  try {
    const avaliacao = await createAvaliacao(
      disciplinaId,
      usuarioId,
      curso,
      codigo,
      passouDePrimeira,
      mediaFinal,
      notaDidaticaProfessor,
      periodoQuePagou,
      disciplina,
      cargaHoraria,
      professor,
      desistiuDaCadeira,
      nivelDificuldade,
      comentario,
      recomendacao
    );
    res.status(201).json(avaliacao);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar avaliação' });
  }
};

export const buscarAvaliacoesPorDisciplina = async (req: Request, res: Response) => {
  const { disciplinaId } = req.params;
  try {
    const avaliacoes = await getAvaliacoesByDisciplinaId(disciplinaId);
    res.status(200).json(avaliacoes);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar avaliações' });
  }
};