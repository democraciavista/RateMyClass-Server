import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryMaterialRepository } from '@repositories/in-memory/in-memory-material-repository'; // Substitua pelo caminho correto
import { InMemoryUserRepository } from '@repositories/in-memory/in-memory-user-repository'; // Substitua pelo caminho correto
import { NotFoundError } from '@errors/not-found-error'; // Substitua pelo caminho correto
import { RegisterMaterialUseCase } from './register';
import { IDisciplineRepository } from '@repositories/interface/discipline-repository';
import { InMemoryDisciplineRepository } from '@repositories/in-memory/in-memory-discipline-repository';
import { Discipline } from '@prisma/client';

let materialRepository: InMemoryMaterialRepository;
let userRepository: InMemoryUserRepository;
let disciplineRepository: IDisciplineRepository;
let sut: RegisterMaterialUseCase;

describe('RegisterMaterial Use Case', () => {
  beforeEach(() => {
    materialRepository = new InMemoryMaterialRepository();
    userRepository = new InMemoryUserRepository();
    disciplineRepository = new InMemoryDisciplineRepository();
    sut = new RegisterMaterialUseCase(
      materialRepository,
      userRepository,
      disciplineRepository,
    );
  });

  it('should register a new material successfully when user and discipline exist', async () => {
    const user = {
      id: '1',
      email: 'user@email.com',
      password: 'hashedPassword',
      course: 'course',
    };
    const discipline: Discipline = {
      id: '1',
      name: 'Math',
      professor: 'Professor X',
      code: 'MATH101',
      hours: 60,
      center: 'Center',
      course: 'Course',
      period: 1,
      type: 'MANDATORY',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    await userRepository.create(user);
    await disciplineRepository.create(discipline);

    const materialData = {
      title: 'Math Notes',
      link: 'http://link-to-material.com',
      userId: user.id,
      disciplineId: discipline.id,
    };

    const { material } = await sut.execute(materialData);

    expect(material.title).toEqual(materialData.title);
    expect(material.link).toEqual(materialData.link);
    expect(material.userId).toEqual(materialData.userId);
    expect(material.disciplineId).toEqual(materialData.disciplineId);
  });

  it('should throw NotFoundError when user does not exist', async () => {
    const discipline: Discipline = {
      id: '1',
      name: 'Math',
      professor: 'Professor X',
      code: 'MATH101',
      hours: 60,
      center: 'Center',
      course: 'Course',
      period: 1,
      type: 'MANDATORY',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    await disciplineRepository.create(discipline);

    const materialData = {
      title: 'Math Notes',
      link: 'http://link-to-material.com',
      userId: 'non-existent-user-id',
      disciplineId: discipline.id,
    };

    await expect(() => sut.execute(materialData)).rejects.toBeInstanceOf(
      NotFoundError,
    );
  });

  it('should throw NotFoundError when discipline does not exist', async () => {
    const user = {
      id: '1',
      email: 'user@email.com',
      password: 'hashedPassword',
      course: 'course',
    };
    await userRepository.create(user);

    const materialData = {
      title: 'Math Notes',
      link: 'http://link-to-material.com',
      userId: user.id,
      disciplineId: 'non-existent-discipline-id',
    };

    await expect(() => sut.execute(materialData)).rejects.toBeInstanceOf(
      NotFoundError,
    );
  });
});
