import { inject, injectable } from 'tsyringe';

import IClientModel from '../models/IClientModel';
import IClientsRepository from '../repositories/IClientsRepository';

@injectable()
export default class ListAllClientsService {
  constructor(
    @inject('ClientsRepository')
    private clientsRepository: IClientsRepository,
  ) {}

  public async execute(): Promise<IClientModel[]> {
    let clients = await this.clientsRepository.findAll();

    clients = clients.map(client => {
      const aux = client;
      delete aux.password;
      return aux;
    });

    return clients;
  }
}
