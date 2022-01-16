import dayjs from 'dayjs';
import { getRepository } from 'typeorm';
import { RefreshToken } from '../entities/RefreshToken';

export class RefreshTokenGenerationService {
  async execute(userId: number): Promise<RefreshToken> {
    const repo = getRepository(RefreshToken);

    const expiresIn = dayjs().add(1, 'day').unix();

    await repo.delete({
      userId,
    });

    const refreshToken = repo.create({
      userId,
      expiresIn,
    });

    return await repo.save(refreshToken);
  }
}
