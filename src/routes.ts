import { Router } from 'express';
import { CategoryDeleteController } from './controllers/ CategoryDeleteController';
import { CategoriesGetAllController } from './controllers/CategoriesGetAllController';
import { CategoryCreateController } from './controllers/CategoryCreateController';
import { CategoryUpdateController } from './controllers/CategoryUpdateController';

const router = Router();

router.post('/categories', new CategoryCreateController().hande);
router.get('/categories', new CategoriesGetAllController().handle);
router.delete('/categories/:uuid', new CategoryDeleteController().handle);
router.put('/categories/:uuid', new CategoryUpdateController().handle);

export { router };
