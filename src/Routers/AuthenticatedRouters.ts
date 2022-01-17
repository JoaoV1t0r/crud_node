import { Router } from 'express';
import { LoginController } from '../Controllers/AuthenticationControllers/LoginController';
import { UserCreateController } from '../Controllers/AuthenticationControllers/UserCreateController';
import { UserRefreshTokenController } from '../Controllers/AuthenticationControllers/UserRefreshTokenController';
import isAuthenticated from '../Middleware/isAuthenticated';

const authenticatedRouter = Router();

authenticatedRouter.use(isAuthenticated);

authenticatedRouter.post('/users', new UserCreateController().handle);
authenticatedRouter.post('/login', new LoginController().handle);
authenticatedRouter.post('/refresh-token', new UserRefreshTokenController().handle);

export { authenticatedRouter };
