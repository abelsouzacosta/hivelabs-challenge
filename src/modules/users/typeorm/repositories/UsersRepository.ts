import { EntityRepository, Repository } from 'typeorm';
import User from '../entities/Users';

@EntityRepository(User)
export default class UsersRepository extends Repository<User> {
  // busca um usuário pelo nickname passado
  public async findByNickname(nickname: string): Promise<User | undefined> {
    const user = this.findOne({
      where: {
        nickname,
      },
    });

    return user;
  }

  // encontra todos os usuário com o mesmo nome
  public async findByName(name: string): Promise<User[] | undefined> {
    const users = this.find({
      where: {
        name,
      },
    });

    return users;
  }

  // encontra todos os usuários pelo lastName
  public async findByLastName(lastName: string): Promise<User[] | undefined> {
    const users = this.find({
      where: {
        lastName,
      },
    });

    return users;
  }
}
