import ApplicationError from '@errors/ApplicationError';
import { getCustomRepository } from 'typeorm';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import User from '../typeorm/entities/Users';

export default class ListUsersService {
  private repository: UsersRepository;

  constructor() {
    this.repository = getCustomRepository(UsersRepository);
  }

  public async execute(): Promise<User[] | undefined> {
    // busca por todos usuários no banco de dados
    const users = await this.repository.find();

    // nenhum usuário encontrado
    if (users.length === 0) throw new ApplicationError('No user was found');

    return users;
  }
}
