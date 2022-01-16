import { Request, Response } from 'express';
import { LoginService } from '../../services/LoginService';

export class LoginController {
  async handle(request: Request, response: Response) {
    const { email, password } = request.body;

    const service = new LoginService();

    const result = await service.execute({ email, password });

    const bodyResponse = {
      success: true,
      message: 'Successfully login user.',
      data: {
        token: result.token,
        refresh_token: {
          uuid: result.refreshToken.uuid,
          expires_in: result.refreshToken.expiresIn,
        },
      },
    };

    return response.json(bodyResponse);
  }
}
