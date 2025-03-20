import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryReactionRepository } from '@repositories/in-memory/in-memory-reaction-repository';
import { RegisterReactionUseCase } from './register';
import { $Enums } from '@prisma/client';
import { AlreadyExistsError } from '@errors/already-exists-error';
import { InMemoryMaterialRepository } from '@repositories/in-memory/in-memory-material-repository';
import { InMemoryReviewRepository } from '@repositories/in-memory/in-memory-review-repository';

let reactionRepository: InMemoryReactionRepository;
let materialRepository: InMemoryMaterialRepository;
let reviewRepository: InMemoryReviewRepository;
let sut: RegisterReactionUseCase;

describe('RegisterReaction Use Case', () => {
  beforeEach(() => {
    reactionRepository = new InMemoryReactionRepository();
    materialRepository = new InMemoryMaterialRepository();
    reviewRepository = new InMemoryReviewRepository();

    sut = new RegisterReactionUseCase(
      reactionRepository,
      materialRepository,
      reviewRepository,
    );
  });

  it('should register a new reaction successfully', async () => {
    const reactionData = {
      userId: 'user-123',
      materialId: 'material-123',
      type: $Enums.ReactionType.LIKE,
      id: 'reaction-123',
    };

    const { Reaction } = await sut.execute(reactionData);

    expect(Reaction.userId).toEqual(reactionData.userId);
    expect(Reaction.materialId).toEqual(reactionData.materialId);
    expect(Reaction.type).toEqual(reactionData.type);
  });

  it('should throw AlreadyExistsError if the reaction already exists', async () => {
    const reactionData = {
      userId: 'user-123',
      materialId: 'material-123',
      type: $Enums.ReactionType.LIKE,
    };

    await reactionRepository.create(reactionData);

    await expect(() => sut.execute(reactionData)).rejects.toBeInstanceOf(
      AlreadyExistsError,
    );
  });

  it('should allow reactions on different materials or disciplines', async () => {
    const reaction1 = {
      userId: 'user-123',
      materialId: 'material-123',
      type: $Enums.ReactionType.LIKE,
    };

    const reaction2 = {
      userId: 'user-123',
      disciplineId: 'discipline-456',
      type: $Enums.ReactionType.LIKE,
    };

    await sut.execute(reaction1);
    const { Reaction } = await sut.execute(reaction2);

    expect(Reaction.userId).toEqual(reaction2.userId);
    expect(Reaction.disciplineId).toEqual(reaction2.disciplineId);
    expect(Reaction.type).toEqual(reaction2.type);
  });
});
