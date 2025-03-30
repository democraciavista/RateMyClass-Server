export interface DisciplinaRepository {
    create(data: {
      codigo: string;
      nome: string;
      professor: string;
      centro: string;
      periodo: string;
      tipo: string;
    }): Promise<any>;
  
    getById(id: string): Promise<any>;
    getAll(): Promise<any>;
  
    update(id: string, data: {
      codigo: string;
      nome: string;
      professor: string;
      centro: string;
      periodo: string;
      tipo: string;
    }): Promise<any>;
  
    delete(id: string): Promise<any>;
  }