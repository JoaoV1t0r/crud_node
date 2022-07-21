import { getRepository, Repository, createConnection } from 'typeorm';
import { Datasets } from '../../../Entities/Datasets';
import { IDatasetsRepository } from '../Interfaces/IDatasetsRepository';
import axios from 'axios';
import multer from 'multer';
import { AppDataSource } from '../../../../index';
import cryptoJS from 'crypto-js';

export class DatasetsRepository implements IDatasetsRepository {
  datasetsRepository: Repository<Datasets>;

  static build(): DatasetsRepository {
    return new DatasetsRepository();
  }

  setRepository(): void {
    this.datasetsRepository = AppDataSource.getRepository(Datasets);
  }

  async createDatabase(Id: string): Promise<boolean> {
    this.setRepository();
    let send: boolean;
    const data = {
      window: '3',
      step: '1',
      company_id: Id,
    };

    var config = {
      method: 'post',
      url: ` https://fnxru22fhl.execute-api.us-east-1.amazonaws.com/dev/app/base/create/${Id}`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify(data),
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        send = true;
        return 'Sucess';
      })
      .catch(function (error) {
        send = false;
        console.log(error);
        return 'Error';
      });
    return send;
  }

  async sendIncrement(file: any, id: string): Promise<boolean> {
    this.setRepository();
    let result: boolean;
    const upload = multer({
      dest: './uploads/',
    });
    /**
     * Função pra criar um hash de integridade e enviar como parâmetro
     * no checksum= na url na config abaixo
     * placeholder: sha1
     */
    const hash = cryptoJS.SHA1(file);

    var config = {
      method: 'post',
      url: ` https://fnxru22fhl.execute-api.us-east-1.amazonaws.com/dev/app/base/increment/${id}?0checksum=${hash}`,
      headers: {
        'Content-Type': 'text/csv',
      },
      data: file,
    };
    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        result = true;
      })
      .catch(function (error) {
        console.log(error);
        result = false;
      });
    return result;
  }

  async getStatusFromModel(id: string): Promise<Object> {
    this.setRepository();
    let requestResponse: Object;
    const config = {
      method: 'get',
      url: ` https://fnxru22fhl.execute-api.us-east-1.amazonaws.com/dev/app/model/${id}`,
      headers: {},
    };
    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        requestResponse = response.data;
      })
      .catch(function (error) {
        console.log(error);
        requestResponse = error;
      });
    return requestResponse;
  }
}
