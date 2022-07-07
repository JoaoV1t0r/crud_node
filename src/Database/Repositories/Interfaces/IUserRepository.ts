import { Repository } from 'typeorm';
import { Users } from '../../../Entities/Users';

export interface IUserRepository {
  userRepository: Repository<Users>;
  getUserByEmail(email: string): Promise<Users>;
  createUser(user: Users): Promise<boolean>;
  deleteUser(email: string): Promise<boolean>;
  patchUser(userEmail: string, newData: object): Promise<boolean>;
  setRepository(): void;
}