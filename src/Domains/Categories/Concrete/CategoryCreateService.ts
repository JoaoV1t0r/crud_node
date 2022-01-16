import { getRepository } from 'typeorm';
import { Category } from '../../../entities/Category';
import { CategoryCreateServiceInterface } from '../Interfaces/CategoriesCreateServiceInterface';
import { CategoryRequestModel } from '../Models/CategoryModelRequest';

export class CategoryCreateService implements CategoryCreateServiceInterface {
  async execute(request: CategoryRequestModel): Promise<Category> {
    const repo = getRepository(Category);

    if (await repo.findOne({ name: request.name })) {
      throw new Error('Category already exists.');
    }
    const category = repo.create({
      name: request.name,
      description: request.description,
    });

    await repo.save(category);

    return category;
  }
}
