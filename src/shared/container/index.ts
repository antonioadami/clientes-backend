import { container } from 'tsyringe';

import '../../modules/clients/providers';
import IClientsRepository from '../../modules/clients/repositories/IClientsRepository';
import ClientsRepository from '../../modules/clients/infra/neo4j/repositories/ClientsRepository';

container.registerSingleton<IClientsRepository>(
  'ClientsRepository',
  ClientsRepository,
);
