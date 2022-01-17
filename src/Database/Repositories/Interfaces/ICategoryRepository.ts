import { Repository } from 'typeorm';
import { Category } from '../../../Entities/Category';

export interface ICategoryRepository {
  categoryRepository: Repository<Category>;
  getCategoryByName(nameCategory: string): Promise<Category>;
  createCategory(category: Category): Promise<Category>;
  setRepository(): void;
}
