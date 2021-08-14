import ICreateClientDTO from '@modules/clients/dtos/ICreateClientDTO';
import IClientModel from '@modules/clients/models/IClientModel';
import IClientsRepository from '@modules/clients/repositories/IClientsRepository';

import session from '@shared/infra/neo4j-driver/index';

export default class ClientsRepository implements IClientsRepository {
  public async create(data: ICreateClientDTO): Promise<IClientModel> {
    const result = await session.run(
      'CREATE(c: Client{name: $name, email: $email, password: $password, cpf: $cpf, phone: $phone}) RETURN c',
      data,
    );

    const client = result.records[0].get(0).properties;
    return client;
  }

  public async update(data: ICreateClientDTO): Promise<IClientModel> {
    const aux = [];

    // eslint-disable-next-line no-unused-expressions
    data.email && aux.push('c.email=$email');
    // eslint-disable-next-line no-unused-expressions
    data.name && aux.push('c.name=$name');
    // eslint-disable-next-line no-unused-expressions
    data.phone && aux.push('c.phone=$phone');
    // eslint-disable-next-line no-unused-expressions
    data.password && aux.push('c.password=$password');

    const result = await session.run(
      `MATCH(c: Client{cpf: $cpf}) SET ${aux.toString()} RETURN c`,
      data,
    );

    const client = result.records[0].get(0).properties;
    return client;
  }

  public async findByCPF(cpf: string): Promise<IClientModel> {
    const result = await session.run('MATCH(c: Client{cpf: $cpf}) RETURN c', {
      cpf,
    });

    if (result.records.length > 0) {
      return result.records[0].get(0).properties;
    }

    return null;
  }

  public async findAll(): Promise<IClientModel[]> {
    const result = await session.run('MATCH (c: Client) RETURN c');

    const clients = result.records.map(client => client.get(0).properties);
    return clients;
  }
}
