import { inject, injectable } from 'tsyringe';

import IClientModel from '../models/IClientModel';
import IClientsRepository from '../repositories/IClientsRepository';

@injectable()
export default class FindClientByCPFService {
  constructor(
    @inject('ClientsRepository')
    private clientsRepository: IClientsRepository,
  ) {}

  public async execute(cpf: string): Promise<IClientModel> {
    const client = await this.clientsRepository.findByCPF(cpf);

    delete client.password;

    return client;
  }
}
