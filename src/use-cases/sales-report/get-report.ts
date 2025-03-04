import { SalesReport } from '@prisma/client';
import { json2csv } from 'json-2-csv';
import fs from 'node:fs';
import * as url from 'url';

import { ISalesReportRepository } from '@repositories/sales-report-repository';
import { NotFoundError } from '@errors/not-found-error';

interface GetSalesReportUseCaseRequest {
  id: string;
}

interface GetSalesReportUseCaseResponse {
  salesReport: SalesReport;
}

export class GetSalesReportUseCase {
  constructor(private salesReportRepository: ISalesReportRepository) {}

  async execute({
    id,
  }: GetSalesReportUseCaseRequest): Promise<GetSalesReportUseCaseResponse> {
    const salesReport = await this.salesReportRepository.findById(id);

    if (!salesReport) {
      throw new NotFoundError('Relatório de vendas não encontrado');
    }

    return { salesReport };
  }
}
