import { inject, injectable } from 'tsyringe';

import IClientModel from '../models/IClientModel';
import IClientsRepository from '../repositories/IClientsRepository';

@injectable()
export default class ListClientsPaginatedService {
  constructor(
    @inject('ClientsRepository')
    private clientsRepository: IClientsRepository,
  ) {}

  public async execute({ limit, page }): Promise<IClientModel[]> {
    const skip = parseInt(limit, 10) * (parseInt(page, 10) - 1);

    let clients = await this.clientsRepository.findPaginated({
      skip,
      limit,
    });

    clients = clients.map(client => {
      const aux = client;
      delete aux.password;
      return aux;
    });

    return clients;
  }
}
