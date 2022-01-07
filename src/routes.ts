import { Router } from 'express';
import { CategoryDeleteController } from './controllers/ CategoryDeleteController';
import { CategoriesGetAllController } from './controllers/CategoriesGetAllController';
import { CategoryCreateController } from './controllers/CategoryCreateController';
import { CategoryUpdateController } from './controllers/CategoryUpdateController';
import { VideoGetAllController } from './controllers/VideoGetAllController';
import { VideosCreateController } from './controllers/VideosCreateController';

const router = Router();

router.post('/categories', new CategoryCreateController().hande);
router.get('/categories', new CategoriesGetAllController().handle);
router.delete('/categories/:uuid', new CategoryDeleteController().handle);
router.put('/categories/:uuid', new CategoryUpdateController().handle);

router.post('/videos', new VideosCreateController().handle);
router.get('/videos', new VideoGetAllController().handle);

export { router };
