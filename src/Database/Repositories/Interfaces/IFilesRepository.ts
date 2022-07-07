import { Repository } from 'typeorm';
import { Files } from '../../../Entities/Files';

export interface IFilesRepository {
  filesRepository: Repository<Files>;
  getFileInformationByCnpj(fileCnpj: string): Promise<Files>;
  saveInfoFromFile(file: Files): Promise<boolean>;
  setRepository(): void;
}