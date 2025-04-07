# BACKEND - Rate my Class
Plataforma sem fins lucrativos para avaliação de disciplinas e professores, além do compartilhamento de materiais acadêmicos.
O projeto foi desenvolvido para a disciplina "IF977 Engenharia de Software" do curso de Sistemas de Informação da UFPE no período 2024.2.

[Código em execução](https://ratemyclass-server.onrender.com).
(Pode demorar um pouco para abrir pois o servidor fica inativo.

## Stack for this project

1. Typescript;
2. Node.Js;
3. Express;
4. Vitest;
5. Docker.

## Running the project

1. Be sure you have **docker/docker-compose** and **pnpm** (or **npm**, if you use it) installed.



3. Install all the dependencies by running
```bash 
npm install
# or
pnpm install
```

4. Create a **.env** file and following content to **.env.example**;
  
5. To run the development server, run
```bash
docker-compose up --build
```

6. To run the migrations, run the server as described and on a new terminal, run:
```bash
pnpm migration
```

7. Now the server should be running!

8. For tests as admin, it is necessary to create the user in the database and change it manually directly in the database, which can be done through Prisma Studio, to do this run
```bash
pnpm studio
```
