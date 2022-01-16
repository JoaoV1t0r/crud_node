import { Request, Response } from 'express';
import { UserRefreshTokenService } from '../services/UserRefreshTokenService';

export class UserRefreshTokenController {
  async hande(request: Request, response: Response) {
    const { refresh_token_uuid } = request.body;

    const service = new UserRefreshTokenService();

    const result = await service.execute(refresh_token_uuid);

    const bodyResponse = {
      success: true,
      message: 'Successfully refresh token.',
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
