import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryReactionRepository } from '@repositories/in-memory/in-memory-reaction-repository';
import { DeleteReactionUseCase } from './delete';
import { NotFoundError } from '@errors/not-found-error';
import { $Enums, Reaction } from '@prisma/client';

let reactionRepository: InMemoryReactionRepository;
let sut: DeleteReactionUseCase;

describe('RemoveReaction Use Case', () => {
  beforeEach(() => {
    reactionRepository = new InMemoryReactionRepository();
    sut = new DeleteReactionUseCase(reactionRepository);
  });

  it('should delete a reaction when it exists', async () => {
    const reactionData: Reaction = {
      id: 'reaction-123',
      userId: 'user-xyz',
      materialId: 'material-abc',
      disciplineId: null,
      type: $Enums.ReactionType.LIKE,
      createdAt: new Date(),
      reviewId: null,
      updatedAt: new Date(),
    };

    await reactionRepository.create(reactionData);

    const { Reaction } = await sut.execute(reactionData.id);

    expect(Reaction).toEqual(reactionData);

    const deletedReaction = await reactionRepository.findById(reactionData.id);
    expect(deletedReaction).toBeNull();
  });

  it('should throw NotFoundError if the reaction does not exist', async () => {
    await expect(() => sut.execute('non-existent-id')).rejects.toBeInstanceOf(
      NotFoundError,
    );
  });
});
