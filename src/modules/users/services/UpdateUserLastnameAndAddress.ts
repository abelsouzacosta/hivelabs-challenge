import ApplicationError from '@errors/ApplicationError';
import { getCustomRepository } from 'typeorm';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import testValidUUID from '../providers/TestValidUUID';
import User from '../typeorm/entities/Users';

interface IUserLastnameAndAddressUpdate {
  id: string;
  lastName: string;
  address: string;
}

export default class UpdateUserLastnameAndAddress {
  private repository: UsersRepository;

  constructor() {
    this.repository = getCustomRepository(UsersRepository);
  }

  /**
   * Verifica se um usuário com o endereço passado já existe
   * @param id string - id do usuário
   * @returns
   */
  private async findUser(id: string): Promise<User | undefined> {
    const user = await this.repository.findById(id);

    return user;
  }

  // verifica se o uuid passado é valido
  private isIdAnUUID(id: string): boolean {
    return testValidUUID(id);
  }

  public async execute({
    id,
    lastName,
    address,
  }: IUserLastnameAndAddressUpdate): Promise<User> {
    if (!this.isIdAnUUID(id))
      throw new ApplicationError('Invalid type: an uuid must be provided');

    const user = await this.findUser(id);

    if (!user) throw new ApplicationError('User not found');

    user.lastName = lastName;
    user.address = address;

    if (!this.repository.save(user))
      throw new ApplicationError(
        "There's an unknown error trying to save user's instance",
      );

    return user;
  }
}
