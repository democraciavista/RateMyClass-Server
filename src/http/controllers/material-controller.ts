import { Request, Response } from 'express';
import { createMaterial, getMateriaisByDisciplinaId } from '../../repositories/material-repository';

export const criarMaterial = async (req: Request, res: Response) => {
  const { disciplinaId, titulo, descricao, url } = req.body;
  try {
    const material = await createMaterial(disciplinaId, titulo, descricao, url);
    res.status(201).json(material);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar material' });
  }
};

export const buscarMateriaisPorDisciplina = async (req: Request, res: Response) => {
  const { disciplinaId } = req.params;
  try {
    const materiais = await getMateriaisByDisciplinaId(disciplinaId);
    res.status(200).json(materiais);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar materiais' });
  }
};