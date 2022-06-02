import { Repository } from 'typeorm';
import { Users } from '../../../Entities/Users';

export interface IUserRepository {
  categoryRepository: Repository<Users>;
  //As definições de função serão feitas depois, pois as rotas de usuário precisam utilizar outros frameworks como o express
  getCategoryByName(nameCategory: string): Promise<Users>;
  createCategory(category: Users): Promise<Users>;
  setRepository(): void;
}