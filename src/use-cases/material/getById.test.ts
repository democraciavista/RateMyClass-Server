import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryMaterialRepository } from '@repositories/in-memory/in-memory-material-repository';
import { NotFoundError } from '@errors/not-found-error';
import { Material } from '@prisma/client';
import { GetByIdMaterialUseCase } from './getById';

let materialRepository: InMemoryMaterialRepository;
let sut: GetByIdMaterialUseCase;

describe('GetByIdMaterial Use Case', () => {
  beforeEach(() => {
    materialRepository = new InMemoryMaterialRepository();
    sut = new GetByIdMaterialUseCase(materialRepository);
  });

  it('should return the material when found', async () => {
    const materialData: Material = {
      id: '1',
      title: 'Material 1',
      link: 'http://link1.com',
      userId: '1',
      subjectId: '1',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await materialRepository.create(materialData);

    const { material } = await sut.execute(materialData.id);

    expect(material.id).toEqual(materialData.id);
    expect(material.title).toEqual(materialData.title);
    expect(material.link).toEqual(materialData.link);
  });

  it('should throw NotFoundError when material is not found', async () => {
    const invalidId = 'non-existent-id';

    await expect(() => sut.execute(invalidId)).rejects.toBeInstanceOf(
      NotFoundError,
    );
  });
});
