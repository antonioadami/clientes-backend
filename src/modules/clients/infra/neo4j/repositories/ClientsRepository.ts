import ICreateClientDTO from '@modules/clients/dtos/ICreateClientDTO';
import IClientModel from '@modules/clients/models/IClientModel';
import IClientsRepository from '@modules/clients/repositories/IClientsRepository';

import session from '@shared/infra/neo4j-driver/index';

export default class ClientsRepository implements IClientsRepository {
  public async create({
    email,
    name,
    password,
  }: ICreateClientDTO): Promise<IClientModel> {
    const result = await session.run(
      'CREATE(c: Client{name: $name, email: $email, password: $password}) RETURN c',
      { name, email, password },
    );

    const client = result.records[0].get(0).properties;
    return client;
  }
}
