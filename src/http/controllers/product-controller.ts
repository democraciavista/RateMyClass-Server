import { Request, Response, NextFunction } from 'express';

import { ProductUpdateSchema } from '@DTOs/product/update';
import { ProductRegisterSchema } from '@DTOs/product/register';
import { ProductSearchByFiltersSchema } from '@DTOs/product/search-by-filters';

import { makeProductRegisterUseCase } from '@use-cases/factories/product/make-register-use-case';
import { makeListProductUseCase } from '@use-cases/factories/product/make-list-use-case';
import { makeProductDeleteUseCase } from '@use-cases/factories/product/make-delete-use-case';
import { makeProductUpdateUseCase } from '@use-cases/factories/product/make-update-use-case';
import { makeGetProductUseCase } from '@use-cases/factories/product/make-get-product-use-case';

class ProductController {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const data = ProductRegisterSchema.parse(req.body);

      const registerUseCase = makeProductRegisterUseCase();

      const lowerCaseName = data.name.toLowerCase();
      const lowerCaseDescription = data.description.toLowerCase();

      await registerUseCase.execute({
        ...data,
        name: lowerCaseName,
        description: lowerCaseDescription,
      });

      res.status(201).json({
        message: 'Produto criado com sucesso!',
      });

      return next();
    } catch (error) {
      return next(error);
    }
  }

  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const { maxPrice, minPrice, name, stock } =
        ProductSearchByFiltersSchema.parse(req.query);

      const listUseCase = makeListProductUseCase();

      const { products } = await listUseCase.execute({
        maxPrice,
        minPrice,
        name,
        stock,
      });

      if (products.length === 0) {
        res.status(204).json({
          message: 'Nenhum produto foi criado.',
        });

        return next();
      }

      res.status(200).json({
        data: products,
        message: 'Listagem de produtos.',
      });

      return next();
    } catch (error) {
      return next(error);
    }
  }

  async getProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const { productId } = req.params;

      const getProductUseCase = makeGetProductUseCase();

      const { product } = await getProductUseCase.execute({ id: productId });

      res.status(200).json({
        data: product,
        message: 'Produto encontrado.',
      });

      return next();
    } catch (error) {
      return next(error);
    }
  }

  async save(req: Request, res: Response, next: NextFunction) {
    try {
      const { productId } = req.params;
      const data = ProductUpdateSchema.parse(req.body);

      const updateUseCase = makeProductUpdateUseCase();

      const lowerCaseName = data.name?.toLowerCase();
      const lowerCaseDescription = data.description?.toLowerCase();

      await updateUseCase.execute({
        ...data,
        description: lowerCaseDescription,
        name: lowerCaseName,
        id: productId,
      });

      res.status(200).json({
        message: 'Produto atualizado com sucesso.',
      });

      return next();
    } catch (error) {
      return next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { productId } = req.params;

      const deleteUseCase = makeProductDeleteUseCase();

      await deleteUseCase.execute(productId);

      res.status(200).json({
        message: 'Produto deletado com sucesso.',
      });

      return next();
    } catch (error) {
      return next(error);
    }
  }
}

export default new ProductController();
