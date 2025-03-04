import { Prisma, Consumer } from '@prisma/client';

import prisma from '@database';

import { IConsumerRepository } from '@repositories/consumer-repository';

export class PrismaConsumerRepository implements IConsumerRepository {
  async create(data: Prisma.ConsumerUncheckedCreateInput): Promise<Consumer> {
    const consumer = await prisma.consumer.create({ data });

    return consumer;
  }

  async findAll(name?: string): Promise<Consumer[]> {
    const consumers = name
      ? await prisma.consumer.findMany({
          where: {
            fullName: {
              contains: name,
            },
          },
        })
      : await prisma.consumer.findMany();

    return consumers;
  }

  async findByUserId(userId: string): Promise<Consumer | null> {
    const consumer = await prisma.consumer.findUnique({ where: { userId } });

    return consumer;
  }

  async findById(id: string): Promise<Consumer | null> {
    const consumer = await prisma.consumer.findUnique({ where: { id } });

    return consumer;
  }

  async save(
    id: string,
    data: Prisma.ConsumerUncheckedUpdateInput,
  ): Promise<Consumer> {
    const consumer = await prisma.consumer.update({
      where: { id },
      data,
    });

    return consumer;
  }

  async delete(id: string): Promise<Consumer> {
    const consumer = await prisma.consumer.delete({ where: { id } });

    return consumer;
  }
}
