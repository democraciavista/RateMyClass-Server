import { NotFoundError } from '@errors/not-found-error';
import { Statistic, Prisma } from '@prisma/client';
import { IStatisticRepository } from '@repositories/interface/statistic-repository';
import { randomUUID } from 'node:crypto';

export class InMemoryStatisticRepository implements IStatisticRepository {
  public items: Statistic[] = [];

  async create(data: Prisma.StatisticUncheckedCreateInput) {
    const newStatistic: Statistic = {
      id: randomUUID(),
      ...data,
      updatedAt: new Date(),
      createdAt: new Date(),
    };
    this.items.push(newStatistic);
    return newStatistic;
  }

  async findById(id: string) {
    const statistic = this.items.find((statistic) => statistic.id === id);
    if (!statistic) {
      throw new NotFoundError('statistic not found');
    }
    return statistic;
  }

  async delete(id: string) {
    const index = await this.items.findIndex(
      (statistic) => statistic.id === id,
    );
    if (index === -1) {
      throw new NotFoundError('statistic not found');
    }
    this.items.splice(index, 1);
    return this.items[index];
  }

  async update(id: string, data: Prisma.StatisticUncheckedUpdateInput) {
    const index = this.items.findIndex((statistic) => statistic.id === id);
    if (index == -1) {
      throw new NotFoundError('statistic not found');
    }
    this.items[index] = {
      ...this.items[index],
      ...(data as Statistic),
      updatedAt: new Date(),
    };
    const statistic = this.items[index];

    return statistic;
  }

  async findAll() {
    return this.items;
  }
  async findByDisciplineId(disciplineId: string) {
    const statistics = this.items.findIndex(
      (statistics) => statistics.disciplineId === disciplineId,
    );
    if (statistics === -1) {
      throw new NotFoundError('statistic not found');
    }
    return this.items[statistics];
  }
  async upsert(
    id: string,
    data: Prisma.StatisticUncheckedCreateInput,
  ): Promise<Statistic> {
    const index = this.items.findIndex((statistic) => statistic.id === id);
    if (index == -1) {
      const newStatistic: Statistic = {
        id: randomUUID(),
        ...data,
        updatedAt: new Date(),
        createdAt: new Date(),
      };
      this.items.push(newStatistic);
      return newStatistic;
    }
    this.items[index] = {
      ...this.items[index],
      ...(data as Statistic),
      updatedAt: new Date(),
    };
    const statistic = this.items[index];

    return statistic;
  }
}
