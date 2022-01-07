import { getRepository } from 'typeorm';
import { Category } from '../entities/Category';

export class CategoriesGetAllService {
  async execute(): Promise<Category[]> {
    const repo = getRepository(Category);

    const categories = await repo.find({
      select: ['uuid', 'name', 'description', 'created_at'],
    });

    return categories;
  }
}
