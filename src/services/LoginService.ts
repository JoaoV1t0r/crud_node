import { compare } from 'bcrypt';
import { getRepository } from 'typeorm';
import { Users } from '../entities/Users';
import { sign } from 'jsonwebtoken';
import { RefreshTokenGenerationService } from './RefreshTokenGenerationService';
import { RefreshToken } from '../entities/RefreshToken';

type UserRequest = {
  email: string;
  password: string;
};

export class LoginService {
  refreshTokenGeneration: RefreshTokenGenerationService;

  constructor() {
    this.refreshTokenGeneration = new RefreshTokenGenerationService();
  }
  async execute({ email, password }: UserRequest): Promise<{ token: string; refreshToken: RefreshToken }> {
    const repo = getRepository(Users);

    const user = await repo.findOne({ email });

    if (!user) {
      throw new Error('Email or password incorrect.');
    }

    if (!(await compare(password, user.password))) {
      throw new Error('Email or password incorrect.');
    }

    const token = sign({}, '2e713746-533e-4b7e-af9d-638c93e1c6f9', {
      subject: user.uuid,
      expiresIn: '1days',
    });

    const refreshToken = await this.refreshTokenGeneration.execute(user.id);

    return { token, refreshToken };
  }
}
