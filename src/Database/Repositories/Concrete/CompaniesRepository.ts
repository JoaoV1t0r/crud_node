import { getRepository, Repository, createConnection, Binary } from 'typeorm';
import { Companies } from '../../../Entities/Companies';
import { ICompaniesRepository } from '../Interfaces/ICompaniesRepository';
import axios from 'axios';
import multer from 'multer';
import { CompanyData } from '../Interfaces/ICompanyData';
import { AppDataSource } from '../../../../index';
export class CompaniesRepository implements ICompaniesRepository {
  companiesRepository: Repository<Companies>;

  static build(): CompaniesRepository {
    return new CompaniesRepository();
  }

  setRepository(): void {
    this.companiesRepository = AppDataSource.getRepository(Companies);
  }

  async createCompany(company: object): Promise<Companies> {
    this.setRepository();
    try {
      const newCompany = this.companiesRepository.create(company);
      await this.companiesRepository.save(newCompany);
      return newCompany;
    } catch (err) {
      return err;
    }
  }

  async getCompanyByCnpj(cnpjCompany: string): Promise<Companies> {
    this.setRepository();
    let key = cnpjCompany;
    if (cnpjCompany.indexOf(':') !== -1) {
      const substring = cnpjCompany.indexOf(':');
      const fh = cnpjCompany.slice(0, substring);
      const sh = cnpjCompany.slice(substring + 1);
      key = fh + sh;
    }
    return await this.companiesRepository.findOneBy({ cnpj: key });
  }

  async getAllCompanies(): Promise<any> {
    this.setRepository();
    const allCompanies = await this.companiesRepository.find();
    return allCompanies;
  }

  async deleteCompany(cnpjCompany: string): Promise<boolean> {
    this.setRepository();
    let result: boolean = true;
    let key = cnpjCompany;
    console.log(key);
    if (cnpjCompany.indexOf(':') !== -1) {
      const substring = cnpjCompany.indexOf(':');
      const fh = cnpjCompany.slice(0, substring);
      const sh = cnpjCompany.slice(substring + 1);
      key = fh + sh;
    }
    try {
      const aimedCompany = await this.companiesRepository.findOneBy({ cnpj: key });
      await this.companiesRepository.remove(aimedCompany);
    } catch (error) {
      result = false;
    }
    return result;
  }

  async patchCompany(cnpjCompany: string, newName: any): Promise<boolean> {
    this.setRepository();
    console.log('patch repo: ', cnpjCompany, newName);
    const newData = {
      name: newName,
    };
    let result: boolean = true;
    let key = cnpjCompany;
    if (cnpjCompany.indexOf(':') !== -1) {
      const substring = cnpjCompany.indexOf(':');
      const fh = cnpjCompany.slice(0, substring);
      const sh = cnpjCompany.slice(substring + 1);
      key = fh + sh;
    }
    try {
      const aimedCompany = await this.companiesRepository.findOneBy({ cnpj: key });
      console.log('Company: ', aimedCompany, newData);
      await this.companiesRepository.update(aimedCompany, newData);
    } catch (error) {
      console.log(error);
      result = false;
    }
    return result;
  }

  //após usar isso para o envio, o dado recebido deve ser adicionado no banco usando o patch
  async sendCompanyAndGetCompany_id(company: Companies): Promise<CompanyData> {
    const data = {
      name: company.name,
      cnpj: company.cnpj,
      email: company.email,
      password: company.password,
    };

    const config = {
      method: 'post',
      url: ' https://fnxru22fhl.execute-api.us-east-1.amazonaws.com/dev/app/company',
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify(data),
    };

    const response = axios(config)
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        return error.status;
      });
    return response;
  }

  async send_base(data: any): Promise<boolean> {
    let result: boolean = true;
    const upload = multer({
      dest: './uploads/',
    });

    const file = data.files;
    const id = data.id;

    const config = {
      method: 'post',
      url: ` https://fnxru22fhl.execute-api.us-east-1.amazonaws.com/dev/app/company/send/${id}`,
      headers: {
        'Content-Type': 'text/csv',
      },
      data: file,
    };
    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
        result = false;
      });
    return result;
  }
}
