import CreateClientService from '@modules/clients/services/CreateClientService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class ClientsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const createClientService = container.resolve(CreateClientService);

    const client = await createClientService.execute(request.body);

    return response.status(200).json(client);
  }
}
