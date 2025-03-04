import { Prisma, Order, $Enums, OrderItem } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

import prisma from '@database';

import {
  IOrderRepository,
  OrderFilters,
  OrderWithItems,
} from '@repositories/order-repository';

export class PrismaOrderRepository implements IOrderRepository {
  async create(data: Prisma.OrderUncheckedCreateInput): Promise<Order> {
    const order = await prisma.order.create({ data });

    return order;
  }

  async findById(id: string): Promise<OrderWithItems | null> {
    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        OrderItem: true,
      },
    });

    return order;
  }

  async findAll({
    consumerId,
    maxDate,
    maxPrice,
    minDate,
    minPrice,
    status,
  }: OrderFilters): Promise<Order[]> {
    const orders = await prisma.order.findMany({
      where: {
        consumerId,
        createdAt: {
          gte: minDate,
          lte: maxDate,
        },
        total: {
          gte: minPrice,
          lte: maxPrice,
        },
        status,
      },
    });

    return orders;
  }

  async save(
    id: string,
    data: Prisma.OrderUncheckedUpdateInput,
  ): Promise<Order> {
    const order = await prisma.order.update({
      where: { id },
      data,
    });

    return order;
  }

  async delete(id: string): Promise<Order> {
    const order = await prisma.order.delete({ where: { id } });

    return order;
  }
}
