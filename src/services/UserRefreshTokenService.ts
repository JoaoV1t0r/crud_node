import { getRepository } from 'typeorm';
import { sign } from 'jsonwebtoken';
import { RefreshTokenGenerationService } from './RefreshTokenGenerationService';
import { RefreshToken } from '../entities/RefreshToken';
import dayjs from 'dayjs';

export class UserRefreshTokenService {
  async execute(refreshTokenUuid: string): Promise<any> {
    const repo = getRepository(RefreshToken);

    const refreshToken = await repo.findOne({
      relations: ['user'],
      where: {
        uuid: refreshTokenUuid,
      },
    });

    console.log(refreshToken);

    if (!refreshToken) {
      throw new Error('RefreshToken is invalid.');
    }

    const refreshTokenExpired = dayjs().isAfter(dayjs.unix(refreshToken.expiresIn));

    if (!refreshTokenExpired) {
      throw new Error('RefreshToken is invalid.');
    }

    await repo.delete({
      userId: refreshToken.userId,
    });
    const token = sign({}, '2e713746-533e-4b7e-af9d-638c93e1c6f9', {
      subject: refreshToken.user.uuid,
      expiresIn: '1 days',
    });

    const newRefreshToken = new RefreshTokenGenerationService().execute(refreshToken.userId);

    return { token, newRefreshToken };
  }
}
