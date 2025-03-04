import { PrismaSalesReportRepository } from '@repositories/prisma/prisma-sales-report-repository';
import { GenerateSalesReportUseCase } from '@use-cases/sales-report/generate';

export function makeGenerateSalesReportUseCase() {
  const salesReportsRepository = new PrismaSalesReportRepository();
  const generateUseCase = new GenerateSalesReportUseCase(
    salesReportsRepository,
  );

  return generateUseCase;
}
