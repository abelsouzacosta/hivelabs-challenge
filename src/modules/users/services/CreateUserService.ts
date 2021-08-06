import ApplicationError from '@errors/ApplicationError';
import { getCustomRepository } from 'typeorm';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import User from '../typeorm/entities/Users';

interface IUserCreate {
  name: string;
  lastName: string;
  nickname: string;
  address: string;
  bio?: string; // opcional
}

export default class CreateUserService {
  private repository;

  constructor() {
    this.repository = getCustomRepository(UsersRepository);
  }

  // verifica se o nickname segue o padrão especificado
  private _isNicknameWithCorrectLenght(nickname: string): boolean {
    return nickname.length <= 30 ? true : false;
  }

  // verifica se o nickname já existe
  private async _nicknameAlreadyExists(
    nickname: string,
  ): Promise<true | false> {
    const foundUser = await this.repository.findByNickname(nickname);

    return foundUser ? true : false;
  }

  public async execute({
    name,
    lastName,
    nickname,
    address,
    bio,
  }: IUserCreate): Promise<User> {
    if (!this._isNicknameWithCorrectLenght(nickname))
      throw new ApplicationError(
        'Nickname lenght is higher than 30 characters',
      );

    if (!this._nicknameAlreadyExists(nickname))
      throw new ApplicationError('Nickname already exists');

    // criando a instância de usuário
    const user = this.repository.create({
      name,
      lastName,
      nickname,
      address,
      bio,
    });

    // salva o usuário no banco de dados
    this.repository.save(user);

    return user;
  }
}
