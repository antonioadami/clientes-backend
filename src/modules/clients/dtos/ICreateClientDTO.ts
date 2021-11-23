export default interface ICreateClientDTO {
  name: string;
  email: string;
  password?: string;
  cpf: string;
  phone: string;
  age: number;
  birth: Date;
}
