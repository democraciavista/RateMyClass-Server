import { Request, Response } from 'express';
import { createEstatistica, getEstatisticasByDisciplinaId } from '../../repositories/estatistica-repository';

export const criarEstatistica = async (req: Request, res: Response) => {
  const {
    disciplinaId,
    totalAvaliacoes,
    mediaNotas,
    mediaNotaDidatica,
    mediaNivelDificuldade,
    taxaDesistencia,
    notaDisciplina,
    taxaAprovacao,
  } = req.body;

  try {
    const estatistica = await createEstatistica(
      disciplinaId,
      totalAvaliacoes,
      mediaNotas,
      mediaNotaDidatica,
      mediaNivelDificuldade,
      taxaDesistencia,
      notaDisciplina,
      taxaAprovacao
    );
    res.status(201).json(estatistica);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar estatística' });
  }
};

export const buscarEstatisticasPorDisciplina = async (req: Request, res: Response) => {
  const { disciplinaId } = req.params;
  try {
    const estatisticas = await getEstatisticasByDisciplinaId(disciplinaId);
    res.status(200).json(estatisticas);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar estatísticas' });
  }
};