import { injectable } from 'inversify';
import { getRepository } from 'typeorm';
import { Category } from '../../../Entities/Category';
import { ICategoryGetAllService } from '../Interfaces/ICategoryGetAllService';

@injectable()
export class CategoryGetAllService implements ICategoryGetAllService {
  async execute(): Promise<Category[]> {
    const repo = getRepository(Category);

    const categories = await repo.find({
      select: ['uuid', 'name', 'description', 'created_at'],
    });

    return categories;
  }
}
