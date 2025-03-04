import prisma from '@database';
import { Prisma } from '@prisma/client';
import {
  ISalesReportRepository,
  SalesReportFilters,
  SalesReportResponse,
} from '@repositories/sales-report-repository';
import console from 'node:console';

export class PrismaSalesReportRepository implements ISalesReportRepository {
  async getData({
    maxDate,
    minDate,
  }: SalesReportFilters): Promise<SalesReportResponse[]> {
    const data: SalesReportResponse[] = await prisma.$queryRawUnsafe(`
      SELECT P.name, SUM(I.quantity) as total_products, SUM(I.subtotal) as total_price
      FROM orders O INNER JOIN order_items I ON O.id = I.order_id
        INNER JOIN products P ON I.product_id = P.id
      GROUP BY P.name, O.closed_at
      HAVING O.closed_at BETWEEN '${minDate.toISOString()}' AND '${maxDate.toISOString()}';
    `);

    const result = data.map(({ name, total_price, total_products }) => ({
      name,
      total_products: Number(total_products),
      total_price: Number(total_price),
      init_date: new Date(minDate),
      end_date: new Date(maxDate),
    }));

    return result;
  }

  async register(data: Prisma.SalesReportCreateInput) {
    const salesReport = await prisma.salesReport.create({
      data: {
        path: data.path,
        period: data.period,
        products: data.products,
        total: data.total,
      },
    });

    return salesReport;
  }

  async findById(id: string) {
    const salesReport = await prisma.salesReport.findUnique({
      where: { id },
    });

    return salesReport;
  }

  async findAll() {
    const salesReports = await prisma.salesReport.findMany();

    return salesReports;
  }
}
