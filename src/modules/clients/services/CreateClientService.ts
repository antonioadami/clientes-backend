import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IClientModel from '../models/IClientModel';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import IClientsRepository from '../repositories/IClientsRepository';

interface IRequest {
  name: string;
  email: string;
  password: string;
}
@injectable()
export default class CreateClientService {
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
  }: IRequest): Promise<IClientModel> {
    // const checkUserExists = await this.usersRepository.findByEmail(email);

    // if (checkUserExists) {
    //   throw new AppError('Email address already used');
    // }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const client = await this.clientsRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return client;
  }
}
