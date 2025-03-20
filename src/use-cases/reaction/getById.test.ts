import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryReactionRepository } from '@repositories/in-memory/in-memory-reaction-repository';
import { NotFoundError } from '@errors/not-found-error';
import { $Enums, Reaction } from '@prisma/client';
import { GetByIdReactionUseCase } from './getById';

let reactionRepository: InMemoryReactionRepository;
let sut: GetByIdReactionUseCase;

describe('FetchSingleReaction Use Case', () => {
  beforeEach(() => {
    reactionRepository = new InMemoryReactionRepository();
    sut = new GetByIdReactionUseCase(reactionRepository);
  });

  it('should retrieve a reaction by its ID', async () => {
    const reactionData: Reaction = {
      id: 'reaction-001',
      userId: 'user-123',
      materialId: 'material-789',
      disciplineId: null,
      type: $Enums.ReactionType.LIKE,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await reactionRepository.create(reactionData);

    const { Reaction } = await sut.execute(reactionData.id);

    expect(Reaction).toEqual(reactionData);
  });

  it('should throw NotFoundError if the reaction does not exist', async () => {
    await expect(() => sut.execute('non-existent-id')).rejects.toBeInstanceOf(
      NotFoundError,
    );
  });
});
