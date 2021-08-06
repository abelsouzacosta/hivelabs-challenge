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
  private repository: UsersRepository;

  constructor() {
    this.repository = getCustomRepository(UsersRepository);
  }

  // verifica se o nickname possui um comprimento maior que 30 caracteres
  private checkIfNicknameIsOutOfBoudaries(nickname: string): boolean {
    return nickname.length >= 30 ? true : false;
  }

  // verifica se um usuário com o nickname passado já existe
  private async checkIfUserNicknameAlreadyInUse(
    nickname: string,
  ): Promise<User | undefined> {
    return this.repository.findByNickname(nickname);
  }

  // cria o usuário no banco de dados da aplicação
  public async execute({
    name,
    lastName,
    nickname,
    address,
    bio,
  }: IUserCreate): Promise<User> {
    if (this.checkIfNicknameIsOutOfBoudaries(nickname))
      throw new ApplicationError('Nickname length out of boundaries');

    if (await this.checkIfUserNicknameAlreadyInUse(nickname))
      throw new ApplicationError('Nickname already in use');

    // cria a instância de um usuário
    const user = this.repository.create({
      name,
      lastName,
      nickname,
      address,
      bio,
    });

    // salva a instância de usuário
    if (!(await this.repository.save(user)))
      throw new ApplicationError(
        "There's an unknown error trying to save user's instance",
      );

    return user;
  }
}
