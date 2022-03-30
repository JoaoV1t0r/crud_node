import { Container } from 'inversify';
import { CategoryCreateService } from '../Domains/Categories/Concrete/CategoryCreateService';
import { CategoryGetAllService } from '../Domains/Categories/Concrete/CategoryGetAllService';
import { ICategoriesCreateService } from '../Domains/Categories/Interfaces/ICategoriesCreateService';
import { ICategoryGetAllService } from '../Domains/Categories/Interfaces/ICategoryGetAllService';

export default class DiContainer {
  private diContainer: Container;

  public static configure(): Container {
    const diContainer = new Container();
    diContainer.bind<ICategoriesCreateService>('ICategoriesCreateService').to(CategoryCreateService).inSingletonScope();
    diContainer.bind<ICategoryGetAllService>('ICategoryGetAllService').to(CategoryGetAllService).inSingletonScope();
    return diContainer;
  }
}
