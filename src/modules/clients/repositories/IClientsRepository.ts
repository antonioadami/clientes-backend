import ICreateClientDTO from '../dtos/ICreateClientDTO';
import IClientModel from '../models/IClientModel';

export default interface IClientsRepository {
  create(data: ICreateClientDTO): Promise<IClientModel>;
}
