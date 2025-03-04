import { OrderItem, Prisma } from '@prisma/client';

import { IOrderItemRepository } from '@repositories/order-item-repository';
import { randomUUID } from 'crypto';

export class InMemoryOrderItemsRepository implements IOrderItemRepository {
  private orderItems: OrderItem[] = [];

  async create(data: Prisma.OrderItemUncheckedCreateInput): Promise<OrderItem> {
    const orderItem = {
      ...data,
      id: randomUUID() as string,
      unitPrice: new Prisma.Decimal(String(data.unitPrice)),
      subtotal: new Prisma.Decimal(String(data.subtotal)),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.orderItems.push(orderItem);

    return orderItem;
  }

  async findById(id: string): Promise<OrderItem | null> {
    const orderItem = this.orderItems.find((item) => item.id === id);

    return orderItem || null;
  }

  async findByOrderId(orderId: string): Promise<OrderItem[]> {
    const orderItems = this.orderItems.filter(
      (item) => item.orderId === orderId,
    );

    return orderItems;
  }

  async save(
    id: string,
    data: Prisma.OrderItemUncheckedUpdateInput,
  ): Promise<OrderItem> {
    const orderItemIndex = this.orderItems.findIndex((item) => item.id === id);

    if (orderItemIndex < 0) {
      throw new Error('Order item not found');
    }

    const orderItem = this.orderItems[orderItemIndex];

    const updatedOrderItem: OrderItem = {
      id: orderItem.id,
      orderId: orderItem.orderId,
      createdAt: orderItem.createdAt,
      productId: orderItem.productId,
      quantity: (data.quantity as number | undefined) || orderItem.quantity,
      subtotal: new Prisma.Decimal(String(data.subtotal || orderItem.subtotal)),
      unitPrice: new Prisma.Decimal(
        String(data.unitPrice || orderItem.unitPrice),
      ),
      updatedAt: new Date(),
    };

    this.orderItems[orderItemIndex] = updatedOrderItem;

    return updatedOrderItem;
  }

  async delete(id: string): Promise<OrderItem> {
    const orderItemIndex = this.orderItems.findIndex((item) => item.id === id);

    if (orderItemIndex < 0) {
      throw new Error('Order item not found');
    }

    const orderItem = this.orderItems[orderItemIndex];

    this.orderItems.splice(orderItemIndex, 1);

    return orderItem;
  }
}
