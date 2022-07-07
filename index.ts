import 'reflect-metadata';
import { DataSource } from 'typeorm';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { companiesRouter } from './src/Routers/CompaniesRouter';
import { datasetsRouter } from './src/Routers/DatasetsRouter';
import { filesRouter } from './src/Routers/FilesRouter';
import { usersRouter } from './src/Routers/UsersRouter';
import { Companies } from './src/Entities/Companies';
import { Files } from './src/Entities/Files';
import { Datasets } from './src/Entities/Datasets';
import { Users } from './src/Entities/Users';

const app = express();

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'urasawa',
  database: 'sistema',
  entities: [Companies, Files, Datasets /*Users*/],
  synchronize: true,
});

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
    app.use(
      cors({
        credentials: true,
        origin: 'http://localhost:3000',
      }),
    );
    app.use(express.json());

    app.use('/companies', companiesRouter);
    app.use('/files', filesRouter);
    app.use('/datasets', datasetsRouter);
    //app.use("/users", usersRouter) não funcional por enquanto

    app.listen(3002, () => {
      console.log('running on 3002');
    });
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });
