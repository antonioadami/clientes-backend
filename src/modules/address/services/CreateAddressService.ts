import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IClientsRepository from '@modules/clients/repositories/IClientsRepository';
import IAddressModel from '../models/IAddressModel';
import IAddressRepository from '../repositories/IAddressRepository';
import ICreateAddressDTO from '../dtos/ICreateAddressDTO';

@injectable()
export default class CreateAddressService {
  constructor(
    @inject('AddressRepository')
    private addressRepository: IAddressRepository,
    @inject('ClientsRepository')
    private clientsRepository: IClientsRepository,
  ) {}

  public async execute({
    city,
    client_cpf,
    neighborhood,
    number,
    state,
    street,
  }: ICreateAddressDTO): Promise<IAddressModel> {
    const checkClientExists = await this.clientsRepository.findByCPF(
      client_cpf,
    );

    if (!checkClientExists) {
      throw new AppError('Não existe nenhum cliente com esse CPF');
    }

    const client = await this.addressRepository.create({
      city,
      client_cpf,
      neighborhood,
      number,
      state,
      street,
    });

    return client;
  }
}
