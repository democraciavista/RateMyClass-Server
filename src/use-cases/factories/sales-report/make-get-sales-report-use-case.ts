import { PrismaSalesReportRepository } from '@repositories/prisma/prisma-sales-report-repository';
import { GetSalesReportUseCase } from '@use-cases/sales-report/get-report';

export function makeGetSalesReportUseCase() {
  const salesReportsRepository = new PrismaSalesReportRepository();
  const getUseCase = new GetSalesReportUseCase(salesReportsRepository);

  return getUseCase;
}
