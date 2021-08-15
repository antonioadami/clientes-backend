import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { differenceInYears } from 'date-fns';

import AppError from '@shared/errors/AppError';

import CreateClientService from '@modules/clients/services/CreateClientService';
import ListAllClientsService from '@modules/clients/services/ListAllClientsService';
import UpdateClientService from '@modules/clients/services/UpdateClientService';
import DeleteClientService from '@modules/clients/services/DeleteClientService';
import FindClientByCPFService from '@modules/clients/services/FindClientByCPFService';

export default class ClientsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const createClientService = container.resolve(CreateClientService);

    const { name, email, password, cpf, phone, birth } = request.body;

    if (!name || !email || !password || !cpf || !phone) {
      throw new AppError('Missing data');
    }

    const birthDate = new Date(birth);
    const today = new Date().setHours(0, 0, 0, 0);

    const age = differenceInYears(today, birthDate);

    const client = await createClientService.execute({
      name,
      email,
      password,
      cpf,
      phone,
      age,
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

  public async findByCPF(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const findClientByCPFService = container.resolve(FindClientByCPFService);
    const { cpf } = request.params;

    if (!cpf) {
      throw new AppError('CPF não fornecido');
    }

    const clients = await findClientByCPFService.execute(cpf);

    return response.status(200).json(clients);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const updateClientService = container.resolve(UpdateClientService);

    const { name, email, password, phone, birth } = request.body;
    const { cpf } = request.params;

    const birthDate = new Date(birth);
    const today = new Date().setHours(0, 0, 0, 0);

    const age = differenceInYears(today, birthDate);

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
      age,
    });

    return response.status(200).json(client);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const deleteClientService = container.resolve(DeleteClientService);

    const { cpf } = request.params;

    await deleteClientService.execute(cpf);

    return response.status(204).json();
  }
}
