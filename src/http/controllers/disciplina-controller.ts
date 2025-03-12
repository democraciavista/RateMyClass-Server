import { Request, Response, NextFunction } from 'express';
import { makeCreateDisciplinaUseCase } from '@use-cases/factories/disciplina/make-create-disciplina-use-case';
import { makeGetDisciplinaByIdUseCase } from '@use-cases/factories/disciplina/make-get-disciplina-by-id-use-case';
import { makeGetAllDisciplinasUseCase } from '@use-cases/factories/disciplina/make-get-all-disciplinas-use-case';
import { makeUpdateDisciplinaUseCase } from '@use-cases/factories/disciplina/make-update-disciplina-use-case';
import { makeDeleteDisciplinaUseCase } from '@use-cases/factories/disciplina/make-delete-disciplina-use-case';

class DisciplinaController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { codigo, nome, professor, centro, periodo, tipo } = req.body;
      const createDisciplinaUseCase = makeCreateDisciplinaUseCase();
      const disciplina = await createDisciplinaUseCase.execute({
        codigo,
        nome,
        professor,
        centro,
        periodo,
        tipo,
      });
      res.status(201).json(disciplina);
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const getDisciplinaByIdUseCase = makeGetDisciplinaByIdUseCase();
      const disciplina = await getDisciplinaByIdUseCase.execute({ id });
      res.status(200).json(disciplina);
    } catch (error) {
      next(error);
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const getAllDisciplinasUseCase = makeGetAllDisciplinasUseCase();
      const disciplinas = await getAllDisciplinasUseCase.execute();
      res.status(200).json(disciplinas);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { codigo, nome, professor, centro, periodo, tipo } = req.body;
      const updateDisciplinaUseCase = makeUpdateDisciplinaUseCase();
      const disciplina = await updateDisciplinaUseCase.execute({
        id,
        codigo,
        nome,
        professor,
        centro,
        periodo,
        tipo,
      });
      res.status(200).json(disciplina);
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const deleteDisciplinaUseCase = makeDeleteDisciplinaUseCase();
      await deleteDisciplinaUseCase.execute({ id });
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

export const disciplinaController = new DisciplinaController();