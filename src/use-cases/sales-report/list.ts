import { SalesReport } from '@prisma/client';

import { ISalesReportRepository } from '@repositories/sales-report-repository';

interface ListSalesReportsUseCaseResponse {
  salesReports: SalesReport[];
}

export class ListSalesReportsUseCase {
  constructor(private salesReportRepository: ISalesReportRepository) {}

  async execute(): Promise<ListSalesReportsUseCaseResponse> {
    const salesReports = await this.salesReportRepository.findAll();

    return { salesReports };
  }
}
