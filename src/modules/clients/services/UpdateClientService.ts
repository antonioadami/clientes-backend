import { inject, injectable } from 'tsyringe';

import AppError from '../../../shared/errors/AppError';

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
    password,
    cpf,
    phone,
    age,
  }: ICreateClientDTO): Promise<IClientModel> {
    const checkClientExists = await this.clientsRepository.findByCPF(cpf);

    if (!checkClientExists) {
      throw new AppError('Client CPF does not exists');
    }

    let hashedPassword: string = null;
    if (password) {
      hashedPassword = await this.hashProvider.generateHash(password);
    }

    const client = await this.clientsRepository.update({
      name,
      email,
      password: hashedPassword,
      cpf,
      phone,
      age,
    });

    delete client.password;

    return client;
  }
}
