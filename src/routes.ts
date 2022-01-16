import { Router } from 'express';
import { UserCreateController } from './controllers/UserCreateController';
import { LoginController } from './controllers/LoginController';
import { UserRefreshTokenController } from './controllers/UserRefreshTokenController';

const router = Router();

router.post('/users', new UserCreateController().hande);
router.post('/login', new LoginController().hande);
router.post('/refresh-token', new UserRefreshTokenController().hande);

export { router };
