import 'express-async-errors';
import 'reflect-metadata';
import express, { Response, NextFunction, Request } from 'express';
import './Database';
import { categoriesRouters } from './Routers/CategoriesRouters';
import { videosRouter } from './Routers/VideosRouters';
import { authenticatedRouter } from './Routers/AuthenticatedRouters';

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
