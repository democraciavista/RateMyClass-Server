import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryMaterialRepository } from '@repositories/in-memory/in-memory-material-repository';
import { NotFoundError } from '@errors/not-found-error';
import { Material } from '@prisma/client';
import { DeleteMaterialUseCase } from './delete';

let materialRepository: InMemoryMaterialRepository;
let sut: DeleteMaterialUseCase;

describe('DeleteMaterial Use Case', () => {
  beforeEach(() => {
    materialRepository = new InMemoryMaterialRepository();
    sut = new DeleteMaterialUseCase(materialRepository);
  });

  it('should delete a material successfully when it exists', async () => {
    const materialData: Material = {
      id: '1',
      title: 'Material 1',
      link: 'link1',
      userId: '1',
      subjectId: '1',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await materialRepository.create(materialData);

    const { material } = await sut.execute(materialData.id);

    expect(material.id).toEqual(materialData.id);
    expect(await materialRepository.findById(materialData.id)).toBeNull();
  });

  it('should throw NotFoundError when material does not exist', async () => {
    const invalidId = 'non-existent-id';

    await expect(() => sut.execute(invalidId)).rejects.toBeInstanceOf(
      NotFoundError,
    );
  });
});
