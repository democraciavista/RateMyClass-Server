import {
  makeGetAllStatisticUseCase,
  makeGetByDisciplineStatisticUseCase,
  makeGetByIdStatisticUseCase,
} from '@use-cases/factories/statistic';
import { NextFunction, Request, Response } from 'express';

class statisticController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const getAllUseCase = makeGetAllStatisticUseCase();
      const { statistics } = await getAllUseCase.execute();
      res.locals = {
        status: 200,
        message: 'Estatísticas encontradas',
        data: statistics,
      };
      res.json(res.locals);
      return next();
    } catch (error) {
      return next(error);
    }
  }
  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const getByIdUseCase = makeGetByIdStatisticUseCase();
      const { statistic } = await getByIdUseCase.execute(id);
      res.locals = {
        status: 200,
        message: 'Estatística encontrada',
        data: statistic,
      };
      res.json(res.locals);
      return next();
    } catch (error) {
      return next(error);
    }
  }
  async getByDiscipline(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const getByDisciplineUseCase = makeGetByDisciplineStatisticUseCase();
      const { statistic } = await getByDisciplineUseCase.execute(id);
      res.locals = {
        status: 200,
        message: 'Estatística encontrada',
        data: statistic,
      };
      res.json(res.locals);
      return next();
    } catch (error) {
      return next(error);
    }
  }
}
export default new statisticController();
