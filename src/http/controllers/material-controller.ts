import {
  makeDeleteMaterialUseCase,
  makeGetAllWithFiltresMaterialUseCase,
  makeGetByIdMaterialUseCase,
  makeGetFavoriteWithFiltresMaterialUseCase,
  makeRegisterMaterialUseCase,
  makeUpdateMaterialUseCase,
} from '@use-cases/factories/material';
import { MaterialGetWithFilterSchema } from '@DTOs/material/getAllWithFilter';
import { MaterialRegisterSchema } from '@DTOs/material/register';
import { MaterialUpdateSchema } from '@DTOs/material/update';
import { NextFunction, Request, Response } from 'express';

class MaterialControler {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const data = MaterialRegisterSchema.parse(req.body);
      const registerUseCase = makeRegisterMaterialUseCase();
      await registerUseCase.execute(data);
      res.status(201).json({
        message: 'Material criado com sucesso!',
      });
      return next();
    } catch (error) {
      return next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const deleteUseCase = makeDeleteMaterialUseCase();
      await deleteUseCase.execute(id);
      res.status(200).json({
        message: 'Material deletado com sucesso!',
      });
      return next();
    } catch (error) {
      return next(error);
    }
  }
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const data = MaterialUpdateSchema.parse(req.body);
      const updateUseCase = makeUpdateMaterialUseCase();
      await updateUseCase.execute(id, data);
      res.status(200).json({
        message: 'Material atualizado com sucesso!',
      });
      return next();
    } catch (error) {
      return next(error);
    }
  }

  async getAllWithFilters(req: Request, res: Response, next: NextFunction) {
    try {
      const { curso, disciplina, ordem, ordemBy, professor, title } =
        MaterialGetWithFilterSchema.parse(req.query);
      const getAllUseCase = makeGetAllWithFiltresMaterialUseCase();
      const materials = await getAllUseCase.execute({
        curso,
        disciplina,
        ordem,
        ordemBy,
        professor,
        title,
      });

      res.status(200).json({
        message: 'Materiais encontrados com sucesso!',
        data: materials,
      });
      return next();
    } catch (error) {
      return next(error);
    }
  }
  async getFavoriteWithFilters(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { curso, disciplina, ordem, ordemBy, professor, title } =
        MaterialGetWithFilterSchema.parse(req.query);
      const { id } = req.params;
      const getFavoriteUseCase = makeGetFavoriteWithFiltresMaterialUseCase();
      const materials = await getFavoriteUseCase.execute({
        userId: id,
        curso,
        disciplina,
        ordem,
        ordemBy,
        professor,
        title,
      });
      res.status(200).json({
        message: 'Materiais encontrados com sucesso!',
        data: materials,
      });
      return next();
    } catch (error) {
      return next(error);
    }
  }
  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const getByIdUseCase = makeGetByIdMaterialUseCase();
      const { material } = await getByIdUseCase.execute(id);
      res.status(200).json({
        message: 'Material encontrado com sucesso!',
        data: material,
      });
      return next();
    } catch (error) {
      return next(error);
    }
  }
}

export default new MaterialControler();
