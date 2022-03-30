import 'express-async-errors';
import 'reflect-metadata';
import './Database';
import './Controllers/CategoryController';
import * as bodyParser from 'body-parser';
import express, { Response, NextFunction, Request } from 'express';
import { InversifyExpressServer } from 'inversify-express-utils';
import DiContainer from './DependencyInjection/DiContainer';

export const server = new InversifyExpressServer(DiContainer.configure());

server.setConfig((app) => {
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  app.use(express.json());

  app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
    return response.json({
      success: false,
      message: error.message,
    });
  });
});

server.build().listen(3000, () => console.log('Server is runing'));
