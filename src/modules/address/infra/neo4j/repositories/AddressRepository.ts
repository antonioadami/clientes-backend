import ICreateAddressDTO from '@modules/address/dtos/ICreateAddressDTO';
import IAddressModel from '@modules/address/models/IAddressModel';
import IAddressRepository from '@modules/address/repositories/IAddressRepository';

import session from '@shared/infra/neo4j-driver/index';

export default class AddresssRepository implements IAddressRepository {
  public async create(data: ICreateAddressDTO): Promise<IAddressModel> {
    const resultCreateAddress = await session.run(
      'CREATE(a: Address{city: $city, neighborhood: $neighborhood, number: $number, state: $state, street: $street}) RETURN a',
      data,
    );

    await session.run(
      'MATCH(a: Address{city: $city, neighborhood: $neighborhood, number: $number, state: $state, street: $street}), (c:Client{cpf: $client_cpf})  CREATE(c)-[:MORA]->(a)',
      data,
    );

    const Address = resultCreateAddress.records[0].get(0).properties;
    return Address;
  }

  public async update(data: ICreateAddressDTO): Promise<IAddressModel> {
    const aux = [];

    // eslint-disable-next-line no-unused-expressions
    data.city && aux.push('c.city=$city');
    // eslint-disable-next-line no-unused-expressions
    data.neighborhood && aux.push('c.neighborhood=$neighborhood');
    // eslint-disable-next-line no-unused-expressions
    data.number && aux.push('c.number=$number');
    // eslint-disable-next-line no-unused-expressions
    data.state && aux.push('c.state=$state');
    // eslint-disable-next-line no-unused-expressions
    data.street && aux.push('c.street=$street');

    const result = await session.run(
      `MATCH(a: Address{cpf: $cpf}) SET ${aux.toString()} RETURN a`,
      data,
    );

    const Address = result.records[0].get(0).properties;
    return Address;
  }
}
