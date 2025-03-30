import {
  makeUpdateReactionUseCase,
  makeGetAllReactionUseCase,
  makeDeleteReacionUseCase,
  makeRegisterReactionUseCase,
  makeGetByIdReactionUseCase,
} from '@use-cases/factories/reaction';
import { ReactionRegisterSchema } from '@DTOs/reaction/register';
import { ReactionUpdateSchema } from '@DTOs/reaction/update';
import { NextFunction, Request, Response } from 'express';

class reactionControler {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const data = ReactionRegisterSchema.parse(req.body);
      const registerUseCase = makeRegisterReactionUseCase();
      const { type } = await registerUseCase.execute(data);
      let message = 'Reação criada com sucesso!';

      if (type) {
        switch (type) {
          case 'DeleteMaterial':
            message = 'Material deletado devido número de denúncias!';
            break;
          case 'DeleteReview':
            message = 'Avaliação deletada devido número de denúncias!';
            break;
          case 'ReportMaterial':
            message = 'Material reportado com sucesso!';
            break;
          case 'ReportReview':
            message = 'Avaliação reportada com sucesso!';
            break;
          case 'LikeMaterial':
            message = 'Material curtido com sucesso!';
            break;
          case 'LikeReview':
            message = 'Avaliação curtida com sucesso!';
            break;
          case 'FavoriteMaterial':
            message = 'Material favoritado com sucesso!';
            break;
          case 'FavoriteDiscipline':
            message = 'Disciplina favoritada com sucesso!';
            break;
          default:
            message = 'Reação criada com sucesso!';
        }
      }
      res.status(201).json({
        message: message,
      });
      return next();
    } catch (error) {
      return next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const deleteUseCase = makeDeleteReacionUseCase();
      await deleteUseCase.execute(id);
      res.status(200).json({
        message: 'Reação deletada com sucesso!',
      });
      return next();
    } catch (error) {
      return next(error);
    }
  }
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const data = ReactionUpdateSchema.parse(req.body);
      const updateUseCase = makeUpdateReactionUseCase();
      await updateUseCase.execute(id, data);
      res.status(200).json({
        message: 'Reação atualizada com sucesso!',
      });
      return next();
    } catch (error) {
      return next(error);
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const getAllUseCase = makeGetAllReactionUseCase();
      const { Reaction } = await getAllUseCase.execute();

      res.status(200).json({
        message: 'Reações encontradas com sucesso!',
        data: Reaction,
      });
      return next();
    } catch (error) {
      return next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const getByIdUseCase = makeGetByIdReactionUseCase();
      const { Reaction } = await getByIdUseCase.execute(id);
      res.status(200).json({
        message: 'Reação encontrada com sucesso!',
        data: Reaction,
      });
      return next();
    } catch (error) {
      return next(error);
    }
  }
}

export default new reactionControler();
