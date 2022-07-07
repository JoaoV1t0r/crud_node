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
    let key = aimedCnpj;
    if (aimedCnpj.indexOf(':') !== -1) {
      const substring = aimedCnpj.indexOf(':');
      const fh = aimedCnpj.slice(0, substring);
      const sh = aimedCnpj.slice(substring + 1);
      key = fh + sh;
    }
    return await this.filesRepository.findOneBy({ cnpj: key });
  }

  async saveInfoFromFile(file: Files): Promise<boolean> {
    this.setRepository();
    let result: boolean = true;
    try {
      const newFile = this.filesRepository.create(file);
      await this.filesRepository.save(newFile);
    } catch (error) {
      result = false;
    }
    return result;
  }
}
