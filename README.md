

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
