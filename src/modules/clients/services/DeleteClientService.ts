import { inject, injectable } from 'tsyringe';
import AppError from '../../../shared/errors/AppError';

import IClientsRepository from '../repositories/IClientsRepository';

@injectable()
export default class DeleteClientService {
  constructor(
    @inject('ClientsRepository')
    private clientsRepository: IClientsRepository,
  ) {}

  public async execute(cpf: string): Promise<string> {
    const deletedCPF = await this.clientsRepository.delete(cpf);

    if (!deletedCPF) {
      throw new AppError('CPF não existe no sistema');
    }

    return deletedCPF;
  }
}
