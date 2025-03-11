export default {
  preset: 'ts-jest', // Usa ts-jest para transpilar TypeScript
  testEnvironment: 'node', // Define o ambiente de teste como Node.js
  testMatch: ['**/tests/**/*.test.ts'], // Procura arquivos .test.ts na pasta tests
  moduleFileExtensions: ['ts', 'js'], // Permite que o Jest reconheça arquivos TypeScript
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.jest.json', // Usa o tsconfig específico para testes
    },
  },
  moduleNameMapper: {
    // Mapeia os paths do tsconfig para que o Jest os entenda
    '^@app/(.*)$': '<rootDir>/src/app/$1',
    '^@use-cases/(.*)$': '<rootDir>/src/use-cases/$1',
    '^@repositories/(.*)$': '<rootDir>/src/repositories/$1',
    '^@entities/(.*)$': '<rootDir>/src/entities/$1',
    '^@utils/(.*)$': '<rootDir>/src/utils/$1',
    '^@http/(.*)$': '<rootDir>/src/http/$1',
    '^@database/(.*)$': '<rootDir>/src/database/$1',
  },
};