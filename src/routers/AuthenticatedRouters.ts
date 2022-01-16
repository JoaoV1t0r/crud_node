import { Router } from 'express';
import { LoginController } from '../controllers/AuthenticationControllers/LoginController';
import { UserCreateController } from '../controllers/AuthenticationControllers/UserCreateController';
import { UserRefreshTokenController } from '../controllers/AuthenticationControllers/UserRefreshTokenController';

const authenticatedRouter = Router();

authenticatedRouter.post('/users', new UserCreateController().handle);
authenticatedRouter.post('/login', new LoginController().handle);
authenticatedRouter.post('/refresh-token', new UserRefreshTokenController().handle);

export { authenticatedRouter };
