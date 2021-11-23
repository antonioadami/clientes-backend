import { inject, injectable } from 'tsyringe';

import IClientsRepository from '../repositories/IClientsRepository';

@injectable()
export default class CreateClientService {
  constructor(
    @inject('ClientsRepository')
    private clientsRepository: IClientsRepository,
  ) {}

  public async execute(): Promise<number> {
    const count = await this.clientsRepository.count();

    return count;
  }
}
