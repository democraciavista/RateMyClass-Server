import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryMaterialRepository } from '@repositories/in-memory/in-memory-material-repository';
import { Material } from '@prisma/client';
import { GetAllMaterialUseCase } from './getAll';

let materialRepository: InMemoryMaterialRepository;
let sut: GetAllMaterialUseCase;

describe('GetAllMaterial Use Case', () => {
  beforeEach(() => {
    materialRepository = new InMemoryMaterialRepository();
    sut = new GetAllMaterialUseCase(materialRepository);
  });

  it('should return all materials', async () => {
    const materialData: Material[] = [
      {
        id: '1',
        title: 'Material 1',
        link: 'link1',
        userId: '1',
        subjectId: '1',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '2',
        title: 'Material 2',
        link: 'link2',
        userId: '1',
        subjectId: '2',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    materialData.forEach((material) => materialRepository.create(material));

    const { material } = await sut.execute();

    expect(material.length).toBe(2);
    expect(material[0].title).toEqual('Material 1');
    expect(material[1].title).toEqual('Material 2');
  });

  it('should return an empty list if no materials exist', async () => {
    const { material } = await sut.execute();

    expect(material.length).toBe(0);
  });
});
