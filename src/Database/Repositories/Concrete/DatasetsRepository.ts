import { getRepository, Repository, createConnection } from 'typeorm';
import { Datasets } from '../../../Entities/Datasets';
import { IDatasetsRepository } from '../Interfaces/IDatasetsRepository';
import axios from 'axios';
import multer from 'multer';


export class DatasetsRepository implements IDatasetsRepository {
  datasetsRepository: Repository<Datasets>;

  static build(): DatasetsRepository {
    return new DatasetsRepository();
  }

  setRepository(): void {
    this.datasetsRepository = getRepository(Datasets);
  }

  async createDatabase(Id: string): Promise<boolean> {
    this.setRepository();
    let send: boolean;
        const data = {
            window: "3",
            step: "1",
            company_id: Id
          };
          
          var config = {
            method: 'post',
            url: ` https://fnxru22fhl.execute-api.us-east-1.amazonaws.com/dev/app/base/create/${Id}`,
            headers: { 
              'Content-Type': 'application/json'
            },
            data : JSON.stringify(data)
          };
          
          axios(config)
          .then(function (response) {
            console.log(JSON.stringify(response.data));
            send = true
            return('Sucess')
          })
          .catch(function (error) {
            send = false
            console.log(error);
            return('Error')
          });
          return send
    }

  async sendIncrement(file: any, id: string): Promise<boolean> {
    this.setRepository();
    let result: boolean; 
    const upload = multer({
        dest: './uploads/',
      });

    var config = {
        method: 'post',
        url: ` https://fnxru22fhl.execute-api.us-east-1.amazonaws.com/dev/app/base/increment/${id}?checksum=bd4b53baff88b0586a2bd50c74bb5c308d84de70493f33b82ef53f8476634d5e`,
        headers: { 
            'Content-Type': 'text/csv'
        },
        data : file
        };
    axios(config)
    .then(function (response) {
    console.log(JSON.stringify(response.data));
    result = true
    })
    .catch(function (error) {
    console.log(error);
    result = false
    });
    return result
  }

  async getStatusFromModel(id: string): Promise<Object> {
    this.setRepository();
    let requestResponse: Object
    const config = {
      method: 'get',
      url: ` https://fnxru22fhl.execute-api.us-east-1.amazonaws.com/dev/app/model/${id}`,
      headers: { }
    };
    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      requestResponse = response.data
    })
    .catch(function (error) {
      console.log(error);
      requestResponse = error
    });
    return requestResponse;
  }
}
