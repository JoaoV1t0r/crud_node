import 'express-async-errors';
import 'reflect-metadata';
import express, { Response, NextFunction, Request } from 'express';
import './database';
import { router } from './routes';
import { categoriesRouters } from './routers/CategoriesRouters';
import { videosRouter } from './routers/VideosRouters';
import { authenticatedRouter } from './routers/AuthenticatedRouters';

const app = express();

app.use(express.json());

app.use('/categories', categoriesRouters);
app.use('/videos', videosRouter);

app.use(authenticatedRouter);

app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
  return response.json({
    success: false,
    message: error.message,
  });
});

app.listen(3000, () => console.log('Server is runing'));
