import { NotFoundError } from '@errors/not-found-error';
import { Reaction, Prisma } from '@prisma/client';
import { IReactionRepository } from '@repositories/interface/reaction-repository';
import { randomUUID } from 'node:crypto';

export class InMemoryReactionRepository implements IReactionRepository {
  public items: Reaction[] = [];

  async create(data: Prisma.ReactionUncheckedCreateInput) {
    const newReaction: Reaction = {
      id: randomUUID(),
      type: data.type,
      userId: data.userId || randomUUID(),
      materialId: data.materialId || randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
      disciplineId: data.disciplineId || randomUUID(),
    };
    this.items.push(newReaction);
    return newReaction;
  }

  async findById(id: string) {
    const Reaction = this.items.find((Reaction) => Reaction.id === id);
    if (!Reaction) {
      throw new NotFoundError('Reaction not found');
    }
    return Reaction;
  }

  async delete(id: string) {
    const index = await this.items.findIndex((Reaction) => Reaction.id === id);
    if (index === -1) {
      throw new NotFoundError('Reaction not found');
    }
    this.items.splice(index, 1);
    return this.items[index];
  }

  async update(id: string, data: Prisma.ReactionUncheckedUpdateInput) {
    const index = this.items.findIndex((Reaction) => Reaction.id === id);
    if (index == -1) {
      throw new NotFoundError('Reaction not found');
    }
    this.items[index] = {
      ...this.items[index],
      ...(data as Reaction),
      updatedAt: new Date(),
    };
    const reaction = this.items[index];

    return reaction;
  }

  async findAll() {
    return this.items;
  }
  async findByFiltres(data: {
    type?: string;
    userId?: string;
    materialId?: string;
    disciplineId?: string;
  }) {
    const { type, userId, materialId, disciplineId } = data;
    const reactions = this.items.filter((reaction) => {
      return (
        (type ? reaction.type === type : true) &&
        (userId ? reaction.userId === userId : true) &&
        (materialId ? reaction.materialId === materialId : true) &&
        (disciplineId ? reaction.disciplineId === disciplineId : true)
      );
    });
    return reactions;
  }
}
