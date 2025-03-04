import { Request, Response, NextFunction } from 'express';

import { OrderRegisterSchema } from '@DTOs/order/register';
import { OrderSearchByFiltersSchema } from '@DTOs/order/search-by-filters';
import { OrderUpdateSchema } from '@DTOs/order/update';

import { makeRegisterOrderUseCase } from '@use-cases/factories/order/make-register-use-case';
import { makeListOrdersUseCase } from '@use-cases/factories/order/make-list-use-case';
import { makeGetOrderUseCase } from '@use-cases/factories/order/make-get-order-use-case';
import { makeUpdateOrderUseCase } from '@use-cases/factories/order/make-update-status-use-case';

class OrderController {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { consumerId } = OrderRegisterSchema.parse(req.body);

      const registerUseCase = makeRegisterOrderUseCase();

      await registerUseCase.execute({ consumerId });

      res.status(201).json({
        message: 'Pedido criado com sucesso!',
      });

      return next();
    } catch (error) {
      return next(error);
    }
  }

  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const { consumerId, maxDate, maxPrice, minDate, minPrice, status } =
        OrderSearchByFiltersSchema.parse(req.query);

      const listUseCase = makeListOrdersUseCase();

      const orders = await listUseCase.execute({
        consumerId,
        maxDate,
        maxPrice,
        minDate,
        minPrice,
        status,
      });

      res.status(200).json({
        data: orders,
        message: 'Listagem de pedidos',
      });

      return next();
    } catch (error) {
      return next(error);
    }
  }

  async getOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const { orderId } = req.params;

      const listUseCase = makeGetOrderUseCase();

      const orders = await listUseCase.execute({
        id: orderId,
      });

      res.status(200).json({
        data: orders,
        message: 'Listagem de pedidos',
      });

      return next();
    } catch (error) {
      return next(error);
    }
  }

  async save(req: Request, res: Response, next: NextFunction) {
    try {
      const { orderId } = req.params;
      const { status } = OrderUpdateSchema.parse(req.body);

      const updateUseCase = makeUpdateOrderUseCase();

      await updateUseCase.execute({ id: orderId, status });

      res.status(200).json({
        message: 'Pedido atualizado com sucesso!',
      });

      return next();
    } catch (error) {
      return next(error);
    }
  }
}

export default new OrderController();
