import { Category } from '../../../Entities/Category';
import { CategoryRequestModel } from '../Models/CategoryModelRequest';

export interface ICategoriesCreateService {
  execute(request: CategoryRequestModel): Promise<Category>;
}
