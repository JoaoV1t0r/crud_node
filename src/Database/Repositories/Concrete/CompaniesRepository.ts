import { getRepository, Repository, createConnection, Binary } from 'typeorm';
import { Companies } from '../../../Entities/Companies';
import { ICompaniesRepository } from '../Interfaces/ICompaniesRepository';
import axios from 'axios';
import multer from 'multer';

export class CompaniesRepository implements ICompaniesRepository {
  companiesRepository: Repository<Companies>;

  static build(): CompaniesRepository {
    return new CompaniesRepository();
  }

  setRepository(): void {
    this.companiesRepository = getRepository(Companies);
  }

  async createCompany(company: Companies): Promise<Companies> {
    this.setRepository();
    const newCompany = this.companiesRepository.create(company);

    await this.companiesRepository.save(newCompany);

    return newCompany;
  }

  async getCompanyByCnpj(cnpjCompany: string): Promise<Companies> {
    this.setRepository();
    return await this.companiesRepository.findOne({ cnpj: cnpjCompany });
  }

  async deleteCompany(cnpjCompany: string): Promise<void>{
    this.setRepository();
    const pk = cnpjCompany.substring(1, cnpjCompany.length)
    const aimedCompany = await this.companiesRepository.findOne({ cnpj: pk})
    await this.companiesRepository.remove(aimedCompany)
    return
  }

  async patchCompany(cnpjCompany: string, newData: object): Promise<Companies>{
    this.setRepository();
    const pk = cnpjCompany.substring(1, cnpjCompany.length)
    const aimedCompany = await this.companiesRepository.findOne({ cnpj: pk})
    await this.companiesRepository.update(aimedCompany, newData)
    return 
  }

  //após usar isso para o envio, o dado recebido deve ser adicionado no banco usando o patch  
  async sendCompanyAndGetCompany_id(company: Companies): Promise<Companies> {
    this.setRepository();
    const data = {
        name: company.name,
        cnpj: company.cnpj,
        email: company.email,
        password: company.password
      };
    
    const config = {
        method: 'post',
        url: ' https://fnxru22fhl.execute-api.us-east-1.amazonaws.com/dev/app/company',
        headers: { 
        'Content-Type': 'application/json'
        },
        data : JSON.stringify(data)
    };
    const rresponse: any = {}
    axios(config).then(function (response) {
      console.log(response.data);
      const rresponse = response.data
    })
    .catch(function (error) {
      console.log('ocorreu um erro em sendCompanyAndGetCompany_id:', error);
      const rresponse = error
    });
    return rresponse
  }

  async send_base(data: any): Promise<Companies>{
    const upload = multer({
      dest: './uploads/',
    });

    const file = data.files
    const id = data.id

    const config = {
      method: 'post',
      url: ` https://fnxru22fhl.execute-api.us-east-1.amazonaws.com/dev/app/company/send/${id}`,
      headers: { 
        'Content-Type': 'text/csv'
      },
      data : file
    };
    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      return response
    })
    .catch(function (error) {
      console.log(error);
      return error
    });
    return
  }
}