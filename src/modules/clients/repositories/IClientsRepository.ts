import ICreateClientDTO from '../dtos/ICreateClientDTO';
import IFindPaginatedDTO from '../dtos/IFindPaginatedDTO';
import IClientModel from '../models/IClientModel';

export default interface IClientsRepository {
  create(data: ICreateClientDTO): Promise<IClientModel>;
  update(data: ICreateClientDTO): Promise<IClientModel>;
  count(): Promise<number>;
  findByCPF(cpf: string): Promise<IClientModel>;
  findAll(): Promise<IClientModel[]>;
  findPaginated(data: IFindPaginatedDTO): Promise<IClientModel[]>;
  delete(cpf: string): Promise<string>;
}
