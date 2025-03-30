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

class DisciplineController {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { center, code, course, hours, name, professor, type, period } =
        DisciplineRegisterDTO.parse(req.body);
      const registerDisciplinaUseCase = makeRegisterDisciplineUseCase();
      const { discipline } = await registerDisciplinaUseCase.execute({
        center,
        code,
        course,
        hours,
        name,
        professor,
        type,
        period,
      });
      res.locals = {
        status: 201,
        message: 'Disciplina criada com sucesso',
        data: discipline,
      };
      return next();
    } catch (error) {
      return next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const getDisciplinaByIdUseCase = makeGetDisciplineByIdUseCase();
      const { discipline } = await getDisciplinaByIdUseCase.execute(id);
      res.locals = {
        status: 200,
        message: 'Disciplina encontrada',
        data: discipline,
      };
      return next();
    } catch (error) {
      return next(error);
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const getAllDisciplinasUseCase = makeGetAllDisciplineUseCase();
      const { disciplines } = await getAllDisciplinasUseCase.execute();
      res.locals = {
        status: 200,
        message: 'Disciplinas encontradas',
        data: disciplines,
      };
      return next();
    } catch (error) {
      return next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const data = DisciplineUpdateDTO.parse(req.body);
      const updateDisciplinaUseCase = makeUpdateDisciplineUseCase();
      const { discipline } = await updateDisciplinaUseCase.execute(id, data);

      res.locals = {
        status: 200,
        message: 'Disciplina atualizada com sucesso',
        data: discipline,
      };
      return next();
    } catch (error) {
      return next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const deleteDisciplinaUseCase = makeDeleteDisciplinaUseCase();
      await deleteDisciplinaUseCase.execute(id);
      res.locals = {
        status: 204,
        message: 'Disciplina deletada com sucesso',
      };
      return next();
    } catch (error) {
      return next(error);
    }
  }
  async getAllByFiltres(req: Request, res: Response, next: NextFunction) {
    try {
      const data = DisciplineGetAllWithFiltrerDTO.parse(req.query);
      const getAllByFiltresDisciplinaUseCase =
        makeGetAllByFiltresDisciplineUseCase();
      const { disciplines } = await getAllByFiltresDisciplinaUseCase.execute({
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

      res.locals = {
        status: 200,
        message: 'Disciplinas encontradas com sucesso',
        data: disciplines,
      };

      res.json(res.locals);
      return next();
    } catch (error) {
      return next(error);
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
      const { disciplines } = await getAllByFiltresDisciplinaUseCase.execute({
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
      res.locals = {
        status: 200,
        message: 'Disciplinas favoritas encontradas com sucesso',
        data: disciplines,
      };
      return next();
    } catch (error) {
      return next(error);
    }
  }
}

export const disciplineController = new DisciplineController();
