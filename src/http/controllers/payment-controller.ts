import { Request, Response, NextFunction } from 'express';

import { makeUpdateOrderUseCase } from '@use-cases/factories/order/make-update-status-use-case';
import { makeSaleProductUpdateUseCase } from '@use-cases/factories/product/make-sale-update-use-case';

class PaymentController {
  async pay(req: Request, res: Response, next: NextFunction) {
    try {
      const { orderId } = req.params;
      const { deny } = req.query;

      const statusUpdateUseCase = makeUpdateOrderUseCase();
      const saleUpdateUseCase = makeSaleProductUpdateUseCase();

      await statusUpdateUseCase.execute({
        id: orderId,
        status: 'RECEIVED',
        paymentDenied: deny === 'true',
      });

      await saleUpdateUseCase.execute({
        orderId,
      });

      res.status(200).json({
        message: 'Pedido recebido com sucesso!',
      });

      return next();
    } catch (error) {
      return next(error);
    }
  }
}

export default new PaymentController();
