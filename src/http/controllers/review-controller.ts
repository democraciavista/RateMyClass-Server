import { ReviewRegisterSchema } from '@DTOs/review/register';
import { ReviewUpdateSchema } from '@DTOs/review/update';
import data from '@env';
import {
  makeDeleteReviewUseCase,
  makeGetAllReviewUseCase,
  makeGetByIdReviewUseCase,
  makeRegisterReviewUseCase,
  makeUpdateReviewUseCase,
} from '@use-cases/factories/review';
import { NextFunction, Request, Response } from 'express';

class reviewController {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const data = ReviewRegisterSchema.parse(req.body);
      const registerUseCase = makeRegisterReviewUseCase();
      await registerUseCase.execute(data);
      res.locals = {
        status: 201,
        message: 'Avaliação criada com sucesso!',
      };
      return next(res.locals);
    } catch (error) {
      return next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const data = ReviewUpdateSchema.parse(req.body);
      const updateUseCase = makeUpdateReviewUseCase();
      await updateUseCase.execute(id, data);
      res.locals = {
        status: 200,
        message: 'Avaliação atualizada com sucesso!',
      };
      return next();
    } catch (error) {
      return next(error);
    }
  }
  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const deleteUseCase = makeDeleteReviewUseCase();
      await deleteUseCase.execute(id);
      res.locals = {
        status: 200,
        message: 'Avaliação deletada com sucesso!',
      };
      return next();
    } catch (error) {
      return next(error);
    }
  }
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const getAllUseCase = makeGetAllReviewUseCase();
      const { reviews } = await getAllUseCase.execute();
      res.locals = {
        status: 200,
        message: 'Avaliações encontradas com sucesso!',
        data: reviews,
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
      const getByIdUseCase = makeGetByIdReviewUseCase();
      const { review } = await getByIdUseCase.execute(id);
      res.locals = {
        status: 200,
        message: 'Avaliação encontrada com sucesso!',
        data: review,
      };
      return next();
    } catch (error) {
      return next(error);
    }
  }
}

export default new reviewController();
