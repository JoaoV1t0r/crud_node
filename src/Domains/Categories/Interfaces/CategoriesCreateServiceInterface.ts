import { Category } from '../../../entities/Category';
import { CategoryRequestModel } from '../Models/CategoryModelRequest';

export interface CategoryCreateServiceInterface {
  execute(request: CategoryRequestModel): Promise<Category>;
}
