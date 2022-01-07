import { getRepository } from 'typeorm';
import { Category } from '../entities/Category';

type CategoryUpdateRequest = {
  uuid: string;
  name: string;
  description: string;
};

export class CategoryUpdateService {
  async execute({ uuid, name, description }: CategoryUpdateRequest) {
    const repo = getRepository(Category);

    const category = await repo.findOne({ where: { uuid: uuid } });

    if (!category) {
      return new Error('Category does not exists!');
    }

    category.name = name ? name : category.name;
    category.description = description ? description : category.description;

    await repo.save(category);

    return category;
  }
}
