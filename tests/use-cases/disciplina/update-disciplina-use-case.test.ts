import { UpdateDisciplinaUseCase } from '../../../src/use-cases/disciplina/update-disciplina-use-case';
import { DisciplinaRepository } from '../../../src/repositories/disciplina-repository';

// Mock do repositório
const mockDisciplinaRepository: DisciplinaRepository = {
  create: jest.fn(),
  getById: jest.fn(),
  getAll: jest.fn(),
  update: jest.fn().mockResolvedValue({ id: '1', nome: 'Matemática Avançada' }),
  delete: jest.fn(),
};

describe('UpdateDisciplinaUseCase', () => {
  it('deve atualizar uma disciplina', async () => {
    const updateDisciplinaUseCase = new UpdateDisciplinaUseCase(mockDisciplinaRepository);

    const disciplinaData = {
      id: '1',
      codigo: 'MAT101',
      nome: 'Matemática Avançada',
      professor: 'João Silva',
      centro: 'Centro de Ciências',
      periodo: '2023.1',
      tipo: 'Obrigatória',
    };

    const result = await updateDisciplinaUseCase.execute(disciplinaData);

    // Verifica se o repositório foi chamado corretamente
    expect(mockDisciplinaRepository.update).toHaveBeenCalledWith('1', disciplinaData);

    // Verifica se o resultado está correto
    expect(result).toEqual({ id: '1', nome: 'Matemática Avançada' });
  });
});