import { getRepository, Repository } from 'typeorm';
import { Users } from '../../../Entities/Users';
import { IUserRepository } from '../Interfaces/IUserRepository';

export class UserRepository implements IUserRepository {
  userRepository: Repository<Users>;

  static build(): UserRepository {
    return new UserRepository();
  }

  setRepository(): void {
    this.userRepository = getRepository(Users);
  }

  async getUserByEmail(email: string): Promise<Users> {
    this.setRepository();
    let key = email
    if (email.indexOf(":") !== -1){
      const substring = email.indexOf(":");
      const fh = email.slice(0, substring);
      const sh = email.slice(substring + 1);
      key = (fh + sh)  
    }
    return await this.userRepository.findOne({ email: key });
  }

  async createUser(user: Users): Promise<boolean> {
    this.setRepository();
    let result: boolean = true
    try{
      const newUser = this.userRepository.create(user);
      await this.userRepository.save(newUser);
    }
    catch(error){
      result = false;
    }
    return result;
  }

  async deleteUser(userEmail: string): Promise<boolean>{
    this.setRepository();
    let result: boolean = true
    let key = userEmail
    if (userEmail.indexOf(":") !== -1){
      const substring = userEmail.indexOf(":");
      const fh = userEmail.slice(0, substring);
      const sh = userEmail.slice(substring + 1);
      key = (fh + sh)  
    }
    try{
      const aimedUser = await this.userRepository.findOne({ email: key})
      await this.userRepository.remove(aimedUser)
    }
    catch(error){
      result = false
    }
    return result
  }

  async patchUser(userEmail: string, newData: object): Promise<boolean>{
    this.setRepository();
    let result: boolean = true;
    let key = userEmail;
    if (userEmail.indexOf(":") !== -1){
      const substring = userEmail.indexOf(":");
      const fh = userEmail.slice(0, substring);
      const sh = userEmail.slice(substring + 1);
      key = (fh + sh)  
    }
    try{
      const aimedUser = await this.userRepository.findOne({ email: key})
      await this.userRepository.update(aimedUser, newData)
    }
    catch(error){
      result = false
    }
    return result
  }
}

/**
 * /logout: Usa req.session, irá ficar no router?
 * /get user session: enviará o objeto usuário para o useContext, mas usa session, então ficará no router?
 */