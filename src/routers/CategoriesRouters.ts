import { Router } from 'express';
import { CategoryDeleteController } from '../controllers/CategoriesControllers/CategoryDeleteController';
import { CategoriesGetAllController } from '../controllers/CategoriesControllers/CategoriesGetAllController';
import { CategoryCreateController } from '../controllers/CategoriesControllers/CategoryCreateController';
import { CategoryUpdateController } from '../controllers/CategoriesControllers/CategoryUpdateController';
import isAuthenticated from '../middleware/isAuthenticated';

const categoriesRouters = Router();

categoriesRouters.use(isAuthenticated);

categoriesRouters.post('/', new CategoryCreateController().hande);
categoriesRouters.get('/', new CategoriesGetAllController().handle);
categoriesRouters.delete('/:uuid', new CategoryDeleteController().handle);
categoriesRouters.put('/:uuid', new CategoryUpdateController().handle);

export { categoriesRouters };
