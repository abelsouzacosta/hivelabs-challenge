import { getCustomRepository } from 'typeorm';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import User from '../typeorm/entities/Users';

interface IUserNickname {
  nickname: string;
}

// encontra um usuário pelo nickname passado
export default class FindUserByNicknameService {
  private repository: UsersRepository;

  constructor() {
    this.repository = getCustomRepository(UsersRepository);
  }

  public async execute({ nickname }: IUserNickname): Promise<User | undefined> {
    return await this.repository.findByNickname(nickname);
  }
}
