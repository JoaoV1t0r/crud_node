import { Router } from 'express';
import { VideoGetAllController } from '../controllers/VideosControllers/VideoGetAllController';
import { VideosCreateController } from '../controllers/VideosControllers/VideosCreateController';
import isAuthenticated from '../middleware/isAuthenticated';

const videosRouter = Router();

videosRouter.use(isAuthenticated);

videosRouter.post('/', new VideosCreateController().handle);
videosRouter.get('/', new VideoGetAllController().handle);

export { videosRouter };
