import CreateClientService from '@modules/clients/services/CreateClientService';
import ListAllClientsService from '@modules/clients/services/ListAllClientsService';
import UpdateClientService from '@modules/clients/services/UpdateClientService';
import AppError from '@shared/errors/AppError';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class ClientsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const createClientService = container.resolve(CreateClientService);

    const { name, email, password, cpf, phone } = request.body;

    if (!name || !email || !password || !cpf || !phone) {
      throw new AppError('Missing data');
    }

    const client = await createClientService.execute({
      name,
      email,
      password,
      cpf,
      phone,
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

  public async update(request: Request, response: Response): Promise<Response> {
    const updateClientService = container.resolve(UpdateClientService);

    const { name, email, password, phone } = request.body;
    const { cpf } = request.params;

    if (!cpf) {
      throw new AppError('Missing CPF');
    }

    if (!name && !email && !password && !phone) {
      throw new AppError('A property must be provided');
    }

    const client = await updateClientService.execute({
      name,
      email,
      password,
      cpf,
      phone,
    });

    return response.status(200).json(client);
  }
}
