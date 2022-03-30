import { Container } from 'inversify';
import CategoryDi from './CategoryDi';

export default class DiContainer {
  public static configure(): Container {
    const diContainer = new Container();

    new CategoryDi(diContainer);

    return diContainer;
  }
}
