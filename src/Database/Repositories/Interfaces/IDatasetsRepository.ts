import { Repository } from 'typeorm';
import { Datasets } from '../../../Entities/Datasets';

export interface IDatasetsRepository {
  datasetsRepository: Repository<Datasets>;
  createDatabase(Id: string): Promise<boolean>;
  sendIncrement(id: string, file: any): Promise<boolean>;
  getStatusFromModel(id: string): Promise<Object>;
  setRepository(): void;
}