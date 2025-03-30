import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryReactionRepository } from '@repositories/in-memory/in-memory-reaction-repository';
import { UpdateReactionUseCase } from './update';
import { NotFoundError } from '@errors/not-found-error';
import { AlreadyExistsError } from '@errors/already-exists-error';
import { $Enums, Reaction } from '@prisma/client';
import { InMemoryMaterialRepository } from '@repositories/in-memory/in-memory-material-repository';
import { InMemoryReviewRepository } from '@repositories/in-memory/in-memory-review-repository';

let reactionRepository: InMemoryReactionRepository;
let materialRepository: InMemoryMaterialRepository;
let reviewRepository: InMemoryReviewRepository;
let sut: UpdateReactionUseCase;

describe('ModifyReaction Use Case', () => {
  beforeEach(() => {
    reactionRepository = new InMemoryReactionRepository();
    materialRepository= new InMemoryMaterialRepository();
    reviewRepository = new InMemoryReviewRepository();
    sut = new UpdateReactionUseCase(reactionRepository, materialRepository, reviewRepository);
  });

  it('should update a reaction successfully when it exists and no conflicts', async () => {
    const reactionData: Reaction = {
      id: 'reaction-123',
      userId: 'user-xyz',
      materialId: 'material-abc',
      disciplineId: null,
      type: $Enums.ReactionType.LIKE,
      createdAt: new Date(),
      updatedAt: new Date(),
      reviewId: null,
    };

    await reactionRepository.create(reactionData);

    const updatedData = {
      type: $Enums.ReactionType.FAVORITE,
    };

    const { Reaction } = await sut.execute(reactionData.id, updatedData);

    expect(Reaction.type).toEqual(updatedData.type);
    expect(Reaction.id).toEqual(reactionData.id);
  });

  it('should throw NotFoundError if the reaction does not exist', async () => {
    await expect(() =>
      sut.execute('non-existent-id', { type: $Enums.ReactionType.LIKE }),
    ).rejects.toBeInstanceOf(NotFoundError);
  });

  it('should throw AlreadyExistsError if the updated reaction data already exists', async () => {
    const reactionData: Reaction = {
      id: 'reaction-123',
      userId: 'user-xyz',
      materialId: 'material-abc',
      disciplineId: null,
      type: $Enums.ReactionType.LIKE,
      createdAt: new Date(),
      updatedAt: new Date(),
      reviewId: null,
    };

    const reactionData2: Reaction = {
      id: 'reaction-124',
      userId: 'user-abc',
      materialId: 'material-xyz',
      disciplineId: null,
      type: $Enums.ReactionType.REPORT,
      createdAt: new Date(),
      updatedAt: new Date(),
      reviewId: null,
    };

    await reactionRepository.create(reactionData);
    await reactionRepository.create(reactionData2);

    const updatedData = {
      userId: 'user-abc',
      materialId: 'material-xyz',
      type: $Enums.ReactionType.REPORT,
    };

    await expect(() =>
      sut.execute(reactionData.id, updatedData),
    ).rejects.toBeInstanceOf(AlreadyExistsError);
  });
});
