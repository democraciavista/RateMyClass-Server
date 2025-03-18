import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryMaterialRepository } from '@repositories/in-memory/in-memory-material-repository';
import { NotFoundError } from '@errors/not-found-error';
import { Material } from '@prisma/client';
import { UpdateMaterialUseCase } from './update';

let materialRepository: InMemoryMaterialRepository;
let sut: UpdateMaterialUseCase;

describe('UpdateMaterial Use Case', () => {
  beforeEach(() => {
    materialRepository = new InMemoryMaterialRepository();
    sut = new UpdateMaterialUseCase(materialRepository);
  });

  it('should update a material successfully when it exists', async () => {
    const materialData: Material = {
      id: '1',
      title: 'Old Title',
      link: 'http://old-link.com',
      userId: '1',
      subjectId: '1',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await materialRepository.create(materialData);

    const updatedData = {
      title: 'New Title',
      link: 'http://new-link.com',
    };

    const { material } = await sut.execute(materialData.id, updatedData);

    expect(material.title).toEqual(updatedData.title);
    expect(material.link).toEqual(updatedData.link);
  });

  it('should throw NotFoundError when material does not exist', async () => {
    const invalidId = 'non-existent-id';

    await expect(() =>
      sut.execute(invalidId, {
        title: 'New Title',
        link: 'http://new-link.com',
      }),
    ).rejects.toBeInstanceOf(NotFoundError);
  });
});
