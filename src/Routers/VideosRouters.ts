import { Router } from 'express';
import { VideoGetAllController } from '../Controllers/VideosControllers/VideoGetAllController';
import { VideosCreateController } from '../Controllers/VideosControllers/VideosCreateController';
import isAuthenticated from '../Middleware/isAuthenticated';

const videosRouter = Router();

videosRouter.use(isAuthenticated);

videosRouter.post('/', new VideosCreateController().handle);
videosRouter.get('/', new VideoGetAllController().handle);

export { videosRouter };
