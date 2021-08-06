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

  // encontra um usuário pelo id
  public async findById(id: string): Promise<User | undefined> {
    const user = await this.findOne({
      where: {
        id,
      },
    });

    return user;
  }

  // atualiza o nickname de um determinado usuário
  public async updateUserNickname(
    id: string,
    nickname: string,
  ): Promise<User | undefined> {
    const user = await this.findOne({
      where: {
        id,
      },
    });

    if (user) {
      user.nickname = nickname;
      await this.save(user);
    }

    return user;
  }
}
