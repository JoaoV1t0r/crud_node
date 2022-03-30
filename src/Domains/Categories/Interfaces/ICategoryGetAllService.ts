import { Category } from '../../../Entities/Category';

export interface ICategoryGetAllService {
  execute(): Promise<Category[]>;
}
