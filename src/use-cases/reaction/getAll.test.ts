import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryReactionRepository } from '@repositories/in-memory/in-memory-reaction-repository';
import { $Enums, Reaction } from '@prisma/client';
import { GetAllReactionUseCase } from './getAll';

let reactionRepository: InMemoryReactionRepository;
let sut: GetAllReactionUseCase;

describe('ListAllReactions Use Case', () => {
  beforeEach(() => {
    reactionRepository = new InMemoryReactionRepository();
    sut = new GetAllReactionUseCase(reactionRepository);
  });

  it('should return all stored reactions', async () => {
    const reactionsData: Reaction[] = [
      {
        id: 'reaction-001',
        userId: 'user-abc',
        materialId: 'material-xyz',
        disciplineId: null,
        type: $Enums.ReactionType.LIKE,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'reaction-002',
        userId: 'user-def',
        materialId: 'material-123',
        disciplineId: null,
        type: $Enums.ReactionType.FAVORITE,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    for (const reaction of reactionsData) {
      await reactionRepository.create(reaction);
    }

    const { Reaction } = await sut.execute();

    expect(Reaction).toHaveLength(2);
    expect(Reaction).toEqual(expect.arrayContaining(reactionsData));
  });

  it('should return an empty array if no reactions are found', async () => {
    const { Reaction } = await sut.execute();
    expect(Reaction).toEqual([]);
  });
});
