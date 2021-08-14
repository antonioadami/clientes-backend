import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import session from '@shared/infra/neo4j-driver/index';

import IClientModel from '../models/IClientModel';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

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

    const result = await session.run(
      'CREATE(c: Client{name: $name, email: $email, password: $hashedPassword}) RETURN c',
      { name, email, hashedPassword },
    );

    const client = result.records[0].get(0).properties;

    // const user = await this.usersRepository.create({
    //   name,
    //   email,
    //   password: hashedPassword,
    // });

    return client;
  }
}
