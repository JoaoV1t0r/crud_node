import { Router } from 'express';
import { CategoryDeleteController } from '../Controllers/CategoriesControllers/CategoryDeleteController';
import { CategoriesGetAllController } from '../Controllers/CategoriesControllers/CategoriesGetAllController';
import { CategoryCreateController } from '../Controllers/CategoriesControllers/CategoryCreateController';
import { CategoryUpdateController } from '../Controllers/CategoriesControllers/CategoryUpdateController';
import isAuthenticated from '../Middleware/isAuthenticated';

const categoriesRouters = Router();

categoriesRouters.use(isAuthenticated);

categoriesRouters.post('/', new CategoryCreateController().handle);
categoriesRouters.get('/', new CategoriesGetAllController().handle);
categoriesRouters.delete('/:uuid', new CategoryDeleteController().handle);
categoriesRouters.put('/:uuid', new CategoryUpdateController().handle);

export { categoriesRouters };
