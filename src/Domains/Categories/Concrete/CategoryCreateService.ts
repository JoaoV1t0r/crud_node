import { getRepository } from 'typeorm';
import { CategoryRepository } from '../../../Database/Repositories/Concrete/CategoryRepository';
import { ICategoryRepository } from '../../../Database/Repositories/Interfaces/ICategoryRepository';
import { Category } from '../../../Entities/Category';
import { ICategoriesCreateService } from '../Interfaces/ICategoriesCreateService';
import { CategoryRequestModel } from '../Models/CategoryModelRequest';

export class CategoryCreateService implements ICategoriesCreateService {
  categoryRepository: ICategoryRepository;
  category: Category;
  request: CategoryRequestModel;

  constructor(categoryRepository: ICategoryRepository) {
    this.categoryRepository = categoryRepository;
  }

  static build() {
    const categoryRepository = CategoryRepository.build();
    return new CategoryCreateService(categoryRepository);
  }

  async execute(request: CategoryRequestModel): Promise<Category> {
    this.request = request;

    await this.validCategoryExists();

    this.mapCategory();

    const newCategory = this.categoryRepository.createCategory(this.category);

    return newCategory;
  }

  async validCategoryExists() {
    const categoryExists = await this.categoryRepository.getCategoryByName(this.request.name);
    if (categoryExists) {
      throw new Error('Category already exists.');
    }
  }

  mapCategory() {
    this.category = new Category();
    this.category.name = this.request.name;
    this.category.description = this.request.description;
  }
}
