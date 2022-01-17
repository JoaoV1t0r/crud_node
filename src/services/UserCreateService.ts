import { hash } from 'bcrypt';
import { getRepository } from 'typeorm';
import { Users } from '../Entities/Users';

type UserRequest = {
  name: string;
  email: string;
  password: string;
};

export class UserCreateService {
  async execute({ name, email, password }: UserRequest): Promise<Users> {
    const repo = getRepository(Users);

    if (await repo.findOne({ email })) {
      throw new Error('E-mail already registered.');
    }

    const user = repo.create({
      name,
      email,
      password: await hash(password, 12),
    });

    return await repo.save(user);
  }
}
