import { Request, Response, NextFunction } from 'express';

import { makeGenerateSalesReportUseCase } from '@use-cases/factories/sales-report/make-generate-use-case';
import { makeListSalesReportsUseCase } from '@use-cases/factories/sales-report/make-list-use-case';
import { makeGetSalesReportUseCase } from '@use-cases/factories/sales-report/make-get-sales-report-use-case';
import { GenerateSalesReportSchema } from '@DTOs/sales-report/generate';

class SalesReportController {
  async generate(req: Request, res: Response, next: NextFunction) {
    try {
      const { maxDate, minDate } = GenerateSalesReportSchema.parse(req.query);
      const generateUseCase = makeGenerateSalesReportUseCase();
      const { salesReport } = await generateUseCase.execute({
        maxDate,
        minDate,
      });

      res.status(200).json({
        data: salesReport,
        message: 'Relatório de vendas gerado com sucesso!',
      });

      return next();
    } catch (error) {
      return next(error);
    }
  }

  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const listUseCase = makeListSalesReportsUseCase();
      const { salesReports } = await listUseCase.execute();

      if (!salesReports.length) {
        res.status(204).json({
          message: 'Nenhum relatório de vendas foi criado',
        });

        return next();
      }

      res.status(200).json({
        data: salesReports,
        message: 'Relatórios de vendas listados com sucesso!',
      });

      return next();
    } catch (error) {
      return next(error);
    }
  }

  async getSalesReport(req: Request, res: Response, next: NextFunction) {
    try {
      const { salesReportId } = req.params;

      const getSalesReportUseCase = makeGetSalesReportUseCase();
      const { salesReport } = await getSalesReportUseCase.execute({
        id: salesReportId,
      });

      res.status(200).json({
        data: salesReport,
        message: 'Relatório de vendas retornado com sucesso!',
      });

      return next();
    } catch (error) {
      return next(error);
    }
  }

  async download(req: Request, res: Response, next: NextFunction) {
    try {
      const { salesReportId } = req.params;

      const getSalesReportUseCase = makeGetSalesReportUseCase();
      const { salesReport } = await getSalesReportUseCase.execute({
        id: salesReportId,
      });

      res.status(200).download(salesReport.path, (err) => {
        if (err) {
          return next(err);
        }
      });
    } catch (error) {
      return next(error);
    }
  }
}

export default new SalesReportController();
