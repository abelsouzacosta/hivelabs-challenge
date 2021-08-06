import ApplicationError from '@errors/ApplicationError';
import { getCustomRepository } from 'typeorm';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import User from '../typeorm/entities/Users';

interface IGetUser {
  nickname: string;
}

export default class GetUserThroughNicknameService {
  private repository: UsersRepository;

  constructor() {
    this.repository = getCustomRepository(UsersRepository);
  }

  public async execute({ nickname }: IGetUser): Promise<User> {
    const user = await this.repository.findByNickname(nickname);

    if (!user) throw new ApplicationError('User not found');

    return user;
  }
}
