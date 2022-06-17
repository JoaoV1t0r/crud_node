import { Repository } from 'typeorm';
import { Companies } from '../../../Entities/Companies';

export interface ICompaniesRepository {
  companiesRepository: Repository<Companies>;
  getCompanyByCnpj(cnpjCompany: string): Promise<Companies>;
  createCompany(company: Companies): Promise<Companies>;
  setRepository(): void;
  deleteCompany(cnpjCompany: string): Promise<void>;
  patchCompany(cnpjCompany: string, newData: object): Promise<Companies>;
  sendCompanyAndGetCompany_id(company: Companies): Promise<Companies>;
  send_base(data: any): Promise<Companies>
}