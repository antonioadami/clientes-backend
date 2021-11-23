import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import CreateAddressService from '@modules/address/services/CreateAddressService';

export default class ClientsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const createAddressService = container.resolve(CreateAddressService);

    const { city, state, street, number, neighborhood, client_cpf } =
      request.body;

    if (!city || !state || !street || !number || !neighborhood || !client_cpf) {
      throw new AppError('Há dados não fornecidos');
    }

    const client = await createAddressService.execute({
      city,
      state,
      street,
      number,
      neighborhood,
      client_cpf,
    });

    return response.status(200).json(client);
  }
}
