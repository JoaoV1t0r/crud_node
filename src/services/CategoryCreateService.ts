import { getRepository } from 'typeorm';
import { Category } from '../entities/Category';

type CategoryRequest = {
  name: string;
  description: string;
};

export class CategoryCreateService {
  async execute({ name, description }: CategoryRequest) {
    const repo = getRepository(Category);

    if (await repo.findOne({ name })) {
      return new Error('Category already exists.');
    }
    const category = repo.create({
      name,
      description,
    });

    await repo.save(category);

    return category;
  }
}
