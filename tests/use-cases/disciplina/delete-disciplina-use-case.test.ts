import { DeleteDisciplinaUseCase } from '../../../src/use-cases/disciplina/delete-disciplina-use-case';
import { DisciplinaRepository } from '../../../src/repositories/disciplina-repository';

const mockDisciplinaRepository: DisciplinaRepository = {
  create: jest.fn(),
  getById: jest.fn(),
  getAll: jest.fn(),
  update: jest.fn(),
  delete: jest.fn().mockResolvedValue(true),
};

describe('DeleteDisciplinaUseCase', () => {
  it('deve deletar uma disciplina', async () => {
    const deleteDisciplinaUseCase = new DeleteDisciplinaUseCase(mockDisciplinaRepository);

    const result = await deleteDisciplinaUseCase.execute({ id: '1' });

    expect(mockDisciplinaRepository.delete).toHaveBeenCalledWith('1');

    expect(result).toBe(true);
  });
});