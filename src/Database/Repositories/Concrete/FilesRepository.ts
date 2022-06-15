import { getRepository, Repository, createConnection } from 'typeorm';
import { Files } from '../../../Entities/Files';
import { IFilesRepository } from '../Interfaces/IFilesRepository';

export class FilesRepository implements IFilesRepository {
  filesRepository: Repository<Files>;

  static build(): FilesRepository {
    return new FilesRepository();
  }

  setRepository(): void {
    this.filesRepository = getRepository(Files);
  }

  async getFileInformationByCnpj(aimedCnpj: string): Promise<Files> {
    this.setRepository();
    return await this.filesRepository.findOne({ cnpj: aimedCnpj });
  }

  async saveInfoFromFile(file: Files): Promise<Files> {
    this.setRepository();
    const newFile = this.filesRepository.create(file);

    await this.filesRepository.save(newFile);

    return newFile;
  }
}