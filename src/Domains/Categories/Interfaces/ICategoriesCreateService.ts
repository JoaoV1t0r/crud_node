import { ICategoryRepository } from '../../../Database/Repositories/Interfaces/ICategoryRepository';
import { Category } from '../../../Entities/Category';
import { CategoryRequestModel } from '../Models/CategoryModelRequest';

export interface ICategoriesCreateService {
  categoryRepository: ICategoryRepository;
  execute(request: CategoryRequestModel): Promise<Category>;
}
