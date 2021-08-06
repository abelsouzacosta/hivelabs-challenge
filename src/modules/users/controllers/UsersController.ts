import { Request, Response } from 'express';
import CreateUserService from '../services/CreateUserService';
import ListUsersService from '../services/ListUsersService';
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
}
