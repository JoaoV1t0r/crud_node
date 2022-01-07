import { getRepository } from 'typeorm';
import { Category } from '../entities/Category';

export class CategoryDeleteService {
  async execute(uuid: string) {
    const repo = getRepository(Category);

    if (
      !(await repo.findOne({
        where: { uuid: uuid },
      }))
    ) {
      return new Error('Category does not exists!');
    }

    await repo.delete({
      uuid: uuid,
    });
  }
}
