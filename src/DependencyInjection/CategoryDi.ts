import { Container } from 'inversify';
import { CategoryCreateService } from '../Domains/Categories/Concrete/CategoryCreateService';
import { CategoryGetAllService } from '../Domains/Categories/Concrete/CategoryGetAllService';
import { ICategoriesCreateService } from '../Domains/Categories/Interfaces/ICategoriesCreateService';
import { ICategoryGetAllService } from '../Domains/Categories/Interfaces/ICategoryGetAllService';

export default class CategoryDi {
  container: Container;

  constructor(container: Container) {
    this.container = container;
    this.setDi();
  }

  setDi() {
    this.mapServices();
  }

  mapServices() {
    this.container
      .bind<ICategoriesCreateService>('ICategoriesCreateService')
      .to(CategoryCreateService)
      .inSingletonScope();
    this.container.bind<ICategoryGetAllService>('ICategoryGetAllService').to(CategoryGetAllService).inSingletonScope();
  }
}
