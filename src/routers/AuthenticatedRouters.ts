import { Router } from 'express';
import { LoginController } from '../controllers/LoginController';
import { UserCreateController } from '../controllers/UserCreateController';
import { UserRefreshTokenController } from '../controllers/UserRefreshTokenController';

const authenticatedRouter = Router();

authenticatedRouter.post('/users', new UserCreateController().hande);
authenticatedRouter.post('/login', new LoginController().hande);
authenticatedRouter.post('/refresh-token', new UserRefreshTokenController().hande);

export { authenticatedRouter };
