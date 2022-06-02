import { getRepository, Repository, createConnection } from 'typeorm';
import { Category } from '../../../Entities/Category';
import { IUserRepository } from '../Interfaces/IUserRepository';

export class UserRepository implements IUserRepository {
  userRepository: Repository<Category>;

  static build(): UserRepository {
    return new UserRepository();
  }

  setRepository(): void {
    this.userRepository = getRepository(Category);
  }
////As funções serão feitas depois, pois as rotas de usuário precisam utilizar outros frameworks como o express
  async getCategoryByName(nameCategory: string): Promise<Category> {
    this.setRepository();
    return await this.userRepository.findOne({ name: nameCategory });
  }

  async createCategory(category: Category): Promise<Category> {
    this.setRepository();
    const newCategory = this.userRepository.create(category);

    await this.userRepository.save(newCategory);

    return newCategory;
  }
}