import { PrismaSalesReportRepository } from '@repositories/prisma/prisma-sales-report-repository';
import { ListSalesReportsUseCase } from '@use-cases/sales-report/list';

export function makeListSalesReportsUseCase() {
  const salesReportsRepository = new PrismaSalesReportRepository();
  const listUseCase = new ListSalesReportsUseCase(salesReportsRepository);

  return listUseCase;
}
