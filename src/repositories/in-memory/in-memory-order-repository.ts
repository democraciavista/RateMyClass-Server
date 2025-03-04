import { $Enums, Order, Prisma } from '@prisma/client';
import { randomUUID } from 'node:crypto';

import { OrderFilters, OrderWithItems } from '@repositories/order-repository';
import { IOrderRepository } from '@repositories/order-repository';

export class InMemoryOrderRepository implements IOrderRepository {
  public orders: OrderWithItems[] = [];

  async create(data: Prisma.OrderUncheckedCreateInput): Promise<Order> {
    const total = new Prisma.Decimal(Number(data.total || 0));

    const order = {
      id: randomUUID() as string,
      consumerId: data.consumerId,
      status: data.status || 'OPENED',
      total,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.orders.push(order);

    return order;
  }

  async findById(id: string): Promise<Order | null> {
    const order = this.orders.find((item) => item.id === id) || null;

    return order;
  }

  async findAll(filters: OrderFilters): Promise<Order[]> {
    return this.orders.filter((order) => {
      if (filters.consumerId && order.consumerId !== filters.consumerId) {
        return false;
      }

      if (filters.maxDate && order.createdAt > filters.maxDate) {
        return false;
      }

      if (filters.minDate && order.createdAt < filters.minDate) {
        return false;
      }

      if (filters.maxPrice && order.total > filters.maxPrice) {
        return false;
      }

      if (filters.minPrice && order.total < filters.minPrice) {
        return false;
      }

      return true;
    });
  }

  async save(
    id: string,
    data: Prisma.OrderUncheckedUpdateInput,
  ): Promise<Order> {
    const orderIndex = this.orders.findIndex((item) => item.id === id);

    if (orderIndex < 0) {
      throw new Error('Order not found');
    }

    const order = this.orders[orderIndex];

    const total = new Prisma.Decimal(Number(data.total) || order.total);

    const updatedOrder = {
      id: order.id,
      consumerId: order.consumerId,
      status: (data.status as $Enums.OrderStatus | undefined) || order.status,
      total,
      createdAt: order.createdAt,
      updatedAt: new Date(),
    };

    this.orders[orderIndex] = updatedOrder;

    return updatedOrder;
  }

  async delete(id: string): Promise<Order> {
    const orderIndex = this.orders.findIndex((item) => item.id === id);

    if (orderIndex < 0) {
      throw new Error('Order not found');
    }

    const order = this.orders[orderIndex];

    this.orders.splice(orderIndex, 1);

    return order;
  }
}
