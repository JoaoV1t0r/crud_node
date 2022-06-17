import { Repository } from 'typeorm';
import { Datasets } from '../../../Entities/Datasets';

export interface IDatasetsRepository {
  datasetsRepository: Repository<Datasets>;
  createDatabase(Id: string): Promise<Datasets>;
  sendIncrement(id: string, file: any): Promise<void>;
  getStatusFromModel(id: string): Promise<Object>;
  setRepository(): void;
}