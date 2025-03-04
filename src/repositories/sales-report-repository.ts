import { Prisma, SalesReport } from '@prisma/client';

export interface SalesReportResponse {
  name: string;
  total_products: number;
  total_price: number;
  init_date: Date;
  end_date: Date;
}

export interface SalesReportFilters {
  maxDate: Date;
  minDate: Date;
}

export interface ISalesReportRepository {
  getData: ({
    maxDate,
    minDate,
  }: SalesReportFilters) => Promise<SalesReportResponse[]>;
  register: (data: Prisma.SalesReportCreateInput) => Promise<SalesReport>;
  findById: (id: string) => Promise<SalesReport | null>;
  findAll: () => Promise<SalesReport[]>;
}
