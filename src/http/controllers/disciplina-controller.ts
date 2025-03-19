import { Request, Response, NextFunction } from 'express';
import { DisciplineRegisterDTO } from '@DTOs/discipline/register';
import {
  makeGetDisciplineByIdUseCase,
  makeRegisterDisciplineUseCase,
  makeUpdateDisciplineUseCase,
  makeDeleteDisciplinaUseCase,
  makeGetAllByFiltresDisciplineUseCase,
  makeGetAllDisciplineUseCase,
  makeGetAllFavoriteByFiltresUseCase,
} from '@use-cases/factories/disciplina';
import { DisciplineUpdateDTO } from '@DTOs/discipline/update';
import { DisciplineGetAllWithFiltrerDTO } from '@DTOs/discipline/getAllWithFiltrer';
import { DisciplineGetAllFavoriteWithFiltrerDTO } from '@DTOs/discipline/getAllFavoriteWithFiltrer';

class DisciplinaController {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { center, code, course, hours, name, professor, type, period } =
        DisciplineRegisterDTO.parse(req.body);
      const registerDisciplinaUseCase = makeRegisterDisciplineUseCase();
      const disciplina = await registerDisciplinaUseCase.execute({
        center,
        code,
        course,
        hours,
        name,
        professor,
        type,
        period,
      });
      res.status(201).json({
        message: 'Disciplina criada com sucesso',
        disciplina,
      });
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const getDisciplinaByIdUseCase = makeGetDisciplineByIdUseCase();
      const disciplina = await getDisciplinaByIdUseCase.execute(id);
      res.status(200).json({
        message: 'Disciplina encontrada',
        disciplina,
      });
    } catch (error) {
      next(error);
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const getAllDisciplinasUseCase = makeGetAllDisciplineUseCase();
      const disciplinas = await getAllDisciplinasUseCase.execute();
      res.status(200).json(disciplinas);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const data = DisciplineUpdateDTO.parse(req.body);
      const updateDisciplinaUseCase = makeUpdateDisciplineUseCase();
      const disciplina = await updateDisciplinaUseCase.execute(id, data);
      res.status(200).json({
        message: 'Disciplina atualizada com sucesso',
        disciplina,
      });
      next();
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const deleteDisciplinaUseCase = makeDeleteDisciplinaUseCase();
      await deleteDisciplinaUseCase.execute(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
  async getAllByFiltres(req: Request, res: Response, next: NextFunction) {
    try {
      const data = DisciplineGetAllWithFiltrerDTO.parse(req.query);
      const getAllByFiltresDisciplinaUseCase =
        makeGetAllByFiltresDisciplineUseCase();
      const disciplinas = await getAllByFiltresDisciplinaUseCase.execute({
        center: data.center,
        course: data.course,
        code: data.code,
        name: data.name,
        professor: data.professor,
        type: data.type,
        period: data.period,
        ordem: data.ordem,
        ordemBy: data.ordemBy,
      });
      res.status(200).json(disciplinas);
      next();
    } catch (error) {
      next(error);
    }
  }
  async getAllFavoriteByFiltres(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const data = DisciplineGetAllFavoriteWithFiltrerDTO.parse(req.query);
      const getAllByFiltresDisciplinaUseCase =
        makeGetAllFavoriteByFiltresUseCase();
      const disciplinas = await getAllByFiltresDisciplinaUseCase.execute({
        center: data.center,
        course: data.course,
        code: data.code,
        name: data.name,
        professor: data.professor,
        type: data.type,
        period: data.period,
        ordem: data.ordem,
        ordemBy: data.ordemBy,
        userId: data.userId,
      });
      res.status(200).json(disciplinas);
      next();
    } catch (error) {
      next(error);
    }
  }
}

export const disciplinaController = new DisciplinaController();
