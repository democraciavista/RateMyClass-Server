import { Request, Response, NextFunction } from 'express';

import { OrderItemRegisterSchema } from '@DTOs/order-item/register';
import { OrderItemUpdateSchema } from '@DTOs/order-item/update';

import { makeRegisterOrderItemUseCase } from '@use-cases/factories/order-item/make-register-use-case';
import { makeListOrderItemUseCase } from '@use-cases/factories/order-item/make-list-use-case';
import { makeUpdateOrderItemUseCase } from '@use-cases/factories/order-item/make-update-use-case';
import { makeDeleteOrderItemUseCase } from '@use-cases/factories/order-item/make-delete-use-case';

class OrderItemController {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { orderId, productId, quantity } = OrderItemRegisterSchema.parse(
        req.body,
      );

      const registerUseCase = makeRegisterOrderItemUseCase();

      await registerUseCase.execute({
        orderId,
        productId,
        quantity,
      });

      res.status(201).json({
        message: 'Item adiconado ao pedido com sucesso!',
      });

      return next();
    } catch (error) {
      return next(error);
    }
  }

  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const { orderId } = req.params;

      const listUseCase = makeListOrderItemUseCase();

      const { orderItems } = await listUseCase.execute({ orderId });

      res.status(200).json({
        data: orderItems,
        message: 'Itens do pedido listados com sucesso!',
      });

      return next();
    } catch (error) {
      return next(error);
    }
  }

  async save(req: Request, res: Response, next: NextFunction) {
    try {
      const { orderItemId } = req.params;
      const { quantity } = OrderItemUpdateSchema.parse(req.body);

      const updateUseCase = makeUpdateOrderItemUseCase();

      await updateUseCase.execute({
        id: orderItemId,
        quantity,
      });

      res.status(200).json({
        message: 'Item do pedido atualizado com sucesso!',
      });

      return next();
    } catch (error) {
      return next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { orderItemId } = req.params;

      const deleteUseCase = makeDeleteOrderItemUseCase();

      await deleteUseCase.execute({ id: orderItemId });

      res.status(200).json({
        message: 'Item do pedido deletado com sucesso!',
      });

      return next();
    } catch (error) {
      return next(error);
    }
  }
}

export default new OrderItemController();
