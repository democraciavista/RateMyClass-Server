import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryReactionRepository } from '@repositories/in-memory/in-memory-reaction-repository';
import { UpdateReactionUseCase } from './update';
import { NotFoundError } from '@errors/not-found-error';
import { $Enums, Prisma } from '@prisma/client';

let reactionRepository: InMemoryReactionRepository;
let sut: UpdateReactionUseCase;

describe('ModifyUserReaction Use Case', () => {
  beforeEach(() => {
    reactionRepository = new InMemoryReactionRepository();
    sut = new UpdateReactionUseCase(reactionRepository);
  });

  it('should successfully modify an existing reaction', async () => {
    const reactionData = {
      id: 'reaction-abc',
      userId: 'user-xyz',
      materialId: 'material-123',
      type: $Enums.ReactionType.LIKE,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await reactionRepository.create(reactionData);

    const updateData: Prisma.ReactionUpdateInput = {
      type: $Enums.ReactionType.FAVORITE,
    };

    const { Reaction } = await sut.execute(reactionData.id, updateData);

    expect(Reaction.id).toEqual(reactionData.id);
    expect(Reaction.type).toEqual(updateData.type);
  });

  it('should throw NotFoundError if the reaction is missing', async () => {
    const updateData: Prisma.ReactionUpdateInput = {
      type: $Enums.ReactionType.FAVORITE,
    };

    await expect(() =>
      sut.execute('missing-id', updateData),
    ).rejects.toBeInstanceOf(NotFoundError);
  });
});
