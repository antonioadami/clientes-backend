import CreateClientService from '@modules/clients/services/CreateClientService';
import ListAllClientsService from '@modules/clients/services/ListAllClientsService';
import AppError from '@shared/errors/AppError';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class ClientsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const createClientService = container.resolve(CreateClientService);

    const { name, email, password, cpf, telefone } = request.body;

    if (!name || !email || !password || !cpf || !telefone) {
      throw new AppError('Missing data');
    }

    const client = await createClientService.execute({
      name,
      email,
      password,
      cpf,
      telefone,
    });

    return response.status(200).json(client);
  }

  public async findAll(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const listAllClientsService = container.resolve(ListAllClientsService);

    const clients = await listAllClientsService.execute();

    return response.status(200).json(clients);
  }
}
