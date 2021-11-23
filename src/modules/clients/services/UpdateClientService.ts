import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IClientModel from '../models/IClientModel';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import IClientsRepository from '../repositories/IClientsRepository';
import ICreateClientDTO from '../dtos/ICreateClientDTO';

@injectable()
export default class UpdateClientService {
  constructor(
    @inject('HashProvider')
    private hashProvider: IHashProvider,
    @inject('ClientsRepository')
    private clientsRepository: IClientsRepository,
  ) {}

  public async execute({
    name,
    email,
    cpf,
    phone,
    age,
    birth,
  }: ICreateClientDTO): Promise<IClientModel> {
    const checkClientExists = await this.clientsRepository.findByCPF(cpf);

    if (!checkClientExists) {
      throw new AppError('Client CPF does not exists');
    }

    const client = await this.clientsRepository.update({
      name,
      email,
      cpf,
      phone,
      age,
      birth,
    });

    delete client.password;

    return client;
  }
}
