import { Request, Response } from 'express';
import CreateUserService from '../services/CreateUserService';
import GetUserThroughNicknameService from '../services/GetUserThroughNicknameService';
import ListUsersService from '../services/ListUsersService';
import UpdateUserLastnameAndAddress from '../services/UpdateUserLastnameAndAddress';
import UpdateUserNicknameService from '../services/UpdateUserNicknameService';
export default class UsersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { name, lastName } = request.query;

    const list = new ListUsersService();

    const result = await list.execute();

    const users = name
      ? result.filter(user => user.name === name)
      : lastName
      ? result.filter(user => user.lastName === lastName)
      : result;

    return response.status(200).json(users);
  }

  public async get(request: Request, response: Response): Promise<Response> {
    const { nickname } = request.params;

    const get = new GetUserThroughNicknameService();

    const user = await get.execute({ nickname });

    return response.status(200).json(user);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, lastName, nickname, address, bio } = request.body;

    const create = new CreateUserService();

    const user = await create.execute({
      name,
      lastName,
      nickname,
      address,
      bio,
    });

    return response.status(200).json(user);
  }

  public async updateNickname(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;
    const { nickname } = request.body;

    const updateNick = new UpdateUserNicknameService();

    const user = await updateNick.execute({ id, nickname });

    return response.status(200).json(user);
  }

  public async updateLastnameAddress(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;
    const { lastName, address } = request.body;

    const update = new UpdateUserLastnameAndAddress();

    const user = await update.execute({ id, lastName, address });

    return response.status(200).json(user);
  }
}
