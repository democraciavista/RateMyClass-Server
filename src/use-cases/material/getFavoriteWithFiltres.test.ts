import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryMaterialRepository } from '@repositories/in-memory/in-memory-material-repository';
import { Material } from '@prisma/client';
import { GetFavoriteWithFiltresMaterialUseCase } from './getFavoriteWithFiltres';

let materialRepository: InMemoryMaterialRepository;
let sut: GetFavoriteWithFiltresMaterialUseCase;

describe('GetFavoriteWithFiltresMaterial Use Case', () => {
  beforeEach(() => {
    materialRepository = new InMemoryMaterialRepository();
    sut = new GetFavoriteWithFiltresMaterialUseCase(materialRepository);
  });

  it('should return materials filtered by userId, title, and professor', async () => {
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
      {
        id: '3',
        title: 'Material 3',
        link: 'link3',
        userId: '2',
        subjectId: '1',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    materialData.forEach((material) => materialRepository.create(material));

    const requestData: {
      userId: string;
      title: string;
      professor: string;
      ordem: 'asc'|'desc';
      ordemBy: string;
    } = {
      userId: '1',
      title: 'Material 1',
      professor: 'Professor X',
      ordem: 'asc',
      ordemBy: 'createdAt',
    };
    const { material } = await sut.execute(requestData);

    expect(material.length).toBe(1);
    expect(material[0].title).toEqual('Material 1');
  });

  it('should return an empty list when no materials match the filters', async () => {
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

    const requestData: {
      userId: string;
      title: string;
      professor: string;
      ordem: 'asc' | 'desc';
      ordemBy: string;
    } = {
      userId: '1',
      title: 'Nonexistent Material',
      professor: 'Professor Y',
      ordem: 'asc',
      ordemBy: 'createdAt',
    };

    const { material } = await sut.execute(requestData);

    expect(material.length).toBe(0);
  });
});
