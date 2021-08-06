import { Request, Response } from 'express';
import CreateUserService from '../services/CreateUserService';

export default class UsersController {
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
