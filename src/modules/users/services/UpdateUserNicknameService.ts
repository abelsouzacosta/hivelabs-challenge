import ApplicationError from '@errors/ApplicationError';
import FindUserByNicknameService from './FindUserByNicknameService';
import { getCustomRepository } from 'typeorm';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import User from '../typeorm/entities/Users';

interface IUserNicknameUpdate {
  id: string;
  nickname: string;
}

export default class UpdateUserNicknameService {
  private repository: UsersRepository;
  private findUserByNickname;

  constructor() {
    this.repository = getCustomRepository(UsersRepository);
    this.findUserByNickname = new FindUserByNicknameService();
  }

  /**
   * Verifica se o nickname passado pertence a uma instância
   * que possui o id diferente do id passado por parâmetro
   *
   * Usado para lançar um erro de duplicação
   * @param id - string
   * @param nickname - string
   * @returns boolean
   */
  private async nicknameBelongsToAnotherInstance(
    id: string,
    nickname: string,
  ): Promise<boolean> {
    const user = await this.repository.findByNickname(nickname);

    if (user) {
      if (user.id !== id) return true;
    }

    return false;
  }

  // verifica se um usuário existe
  private async userExists(id: string): Promise<boolean> {
    const user = await this.repository.findById(id);

    if (user) return true;

    return false;
  }

  public async execute({ id, nickname }: IUserNicknameUpdate): Promise<User> {
    if (!this.userExists) throw new ApplicationError('User not found');

    if (await this.nicknameBelongsToAnotherInstance(id, nickname))
      throw new ApplicationError('This nickname belongs to another user');

    const user = await this.repository.updateUserNickname(id, nickname);

    if (!user)
      throw new ApplicationError(
        "There's an unknown error trying to save user's instance",
      );

    return user;
  }
}
