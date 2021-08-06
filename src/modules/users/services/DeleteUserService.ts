import ApplicationError from '@errors/ApplicationError';
import { getCustomRepository } from 'typeorm';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import User from '../typeorm/entities/Users';
import testValidUUID from '../providers/TestValidUUID';

interface IDeleteUser {
  id: string;
}

export default class DeleteUserService {
  private repository: UsersRepository;

  constructor() {
    this.repository = getCustomRepository(UsersRepository);
  }

  // responsável por encontrar o usuário
  private async findUser(id: string): Promise<User | undefined> {
    const user = await this.repository.findById(id);

    return user;
  }

  // verifica se o uuid passado é valido
  private isIdAnUUID(id: string): boolean {
    return testValidUUID(id);
  }

  public async execute({ id }: IDeleteUser): Promise<boolean> {
    if (!this.isIdAnUUID(id))
      throw new ApplicationError('Invalid type: an uuid must be provided');

    const user = await this.findUser(id);

    if (!user) throw new ApplicationError('User not found');

    const deleted = await this.repository.remove(user);

    return !!deleted;
  }
}
