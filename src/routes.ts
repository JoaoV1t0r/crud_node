import { Router } from 'express';
import { CategoryCreateController } from './controllers/CategoryCreateController';

const router = Router();

router.post('/categories', new CategoryCreateController().hande);

export { router };
