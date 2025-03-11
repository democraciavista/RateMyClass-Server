import { CreateDisciplinaUseCase } from '../../../src/use-cases/disciplina/create-disciplina-use-case';
import { DisciplinaRepository } from '../../../src/repositories/disciplina-repository';

// Mock do repositório
const mockDisciplinaRepository: DisciplinaRepository = {
  create: jest.fn().mockResolvedValue({ id: '1', nome: 'Matemática' }),
  getById: jest.fn(),
  getAll: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

describe('CreateDisciplinaUseCase', () => {
  it('deve criar uma nova disciplina', async () => {
    const createDisciplinaUseCase = new CreateDisciplinaUseCase(mockDisciplinaRepository);

    const disciplinaData = {
      codigo: 'MAT101',
      nome: 'Matemática',
      professor: 'João Silva',
      centro: 'Centro de Ciências',
      periodo: '2023.1',
      tipo: 'Obrigatória',
    };

    const result = await createDisciplinaUseCase.execute(disciplinaData);

    // Verifica se o repositório foi chamado corretamente
    expect(mockDisciplinaRepository.create).toHaveBeenCalledWith(disciplinaData);

    // Verifica se o resultado está correto
    expect(result).toEqual({ id: '1', nome: 'Matemática' });
  });
});