import { inject, injectable } from 'tsyringe';

import IAddressModel from '../models/IAddressModel';
import IAddressRepository from '../repositories/IAddressRepository';
import ICreateAddressDTO from '../dtos/ICreateAddressDTO';

@injectable()
export default class CreateAddressService {
  constructor(
    @inject('AddressRepository')
    private addressRepository: IAddressRepository,
  ) {}

  public async execute({
    city,
    client_cpf,
    neighborhood,
    number,
    state,
    street,
  }: ICreateAddressDTO): Promise<IAddressModel> {
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
