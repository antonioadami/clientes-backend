import { container } from 'tsyringe';

import '@modules/clients/providers';
import IClientsRepository from '@modules/clients/repositories/IClientsRepository';
import ClientsRepository from '@modules/clients/infra/neo4j/repositories/ClientsRepository';
import IAddressRepository from '@modules/address/repositories/IAddressRepository';
import AddressRepository from '@modules/address/infra/neo4j/repositories/AddressRepository';

container.registerSingleton<IClientsRepository>(
  'ClientsRepository',
  ClientsRepository,
);

container.registerSingleton<IAddressRepository>(
  'AddressRepository',
  AddressRepository,
);
