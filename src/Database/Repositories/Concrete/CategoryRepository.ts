import { getRepository, Repository, createConnection } from 'typeorm';
import { Category } from '../../../Entities/Category';
import { ICategoryRepository } from '../Interfaces/ICategoryRepository';

export class CategoryRepository implements ICategoryRepository {
  categoryRepository: Repository<Category>;

  static build(): CategoryRepository {
    return new CategoryRepository();
  }

  setRepository(): void {
    this.categoryRepository = getRepository(Category);
  }

  async getCategoryByName(nameCategory: string): Promise<Category> {
    this.setRepository();
    return await this.categoryRepository.findOne({ name: nameCategory });
  }

  async createCategory(category: Category): Promise<Category> {
    this.setRepository();
    const newCategory = this.categoryRepository.create(category);

    await this.categoryRepository.save(newCategory);

    return newCategory;
  }
}
