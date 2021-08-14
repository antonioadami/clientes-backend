import ICreateClientDTO from '@modules/clients/dtos/ICreateClientDTO';
import IClientModel from '@modules/clients/models/IClientModel';
import IClientsRepository from '@modules/clients/repositories/IClientsRepository';

import session from '@shared/infra/neo4j-driver/index';

export default class ClientsRepository implements IClientsRepository {
  public async create(data: ICreateClientDTO): Promise<IClientModel> {
    console.log(data);

    const result = await session.run(
      'CREATE(c: Client{name: $name, email: $email, password: $password, cpf: $cpf, telefone: $telefone}) RETURN c',
      data,
    );

    const client = result.records[0].get(0).properties;
    return client;
  }

  public async findByEmail(email: string): Promise<IClientModel> {
    const result = await session.run(
      'MATCH(c: Client{email: $email}) RETURN c',
      { email },
    );

    if (result.records.length > 0) {
      return result.records[0].get(0).properties;
    }

    return null;
  }
}
