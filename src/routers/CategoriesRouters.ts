import { Router } from 'express';
import { CategoryDeleteController } from '../controllers/CategoryDeleteController';
import { CategoriesGetAllController } from '../controllers/CategoriesGetAllController';
import { CategoryCreateController } from '../controllers/CategoryCreateController';
import { CategoryUpdateController } from '../controllers/CategoryUpdateController';
import isAuthenticated from '../middleware/isAuthenticated';

const categoriesRouters = Router();

categoriesRouters.use(isAuthenticated);

categoriesRouters.post('/', new CategoryCreateController().hande);
categoriesRouters.get('/', new CategoriesGetAllController().handle);
categoriesRouters.delete('/:uuid', new CategoryDeleteController().handle);
categoriesRouters.put('/:uuid', new CategoryUpdateController().handle);

export { categoriesRouters };
