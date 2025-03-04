import { $Enums, Order, OrderItem, Prisma } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

export interface OrderWithItems extends Order {
  OrderItem?: OrderItem[];
}

export interface OrderFilters {
  consumerId?: string;
  minDate?: Date;
  maxDate?: Date;
  minPrice?: Decimal | number;
  maxPrice?: Decimal | number;
  status?: $Enums.OrderStatus;
}

export interface IOrderRepository {
  create: (order: Prisma.OrderUncheckedCreateInput) => Promise<Order>;
  findById: (id: string) => Promise<OrderWithItems | null>;
  findAll: (filters: OrderFilters) => Promise<Order[]>;
  save: (id: string, order: Prisma.OrderUncheckedUpdateInput) => Promise<Order>;
  delete: (id: string) => Promise<Order>;
}
