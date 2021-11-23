import ICreateAddressDTO from '../dtos/ICreateAddressDTO';
import IAddressModel from '../models/IAddressModel';

export default interface IAddressRepository {
  create(data: ICreateAddressDTO): Promise<IAddressModel>;
}
