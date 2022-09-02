import { Customer } from "../../domain/entity/customer";
import RepositoryInterface from "../../domain/repository/repository-interface";
import CustomerModel from "../db/sequelize/model/customer.model";

export default class CustomerRepository implements RepositoryInterface<Customer> {
  async create(entity: Customer): Promise<void> {
    try {

      await CustomerModel.create({
        id: entity.id,
        name: entity.name,
        email: entity.email,
        zip: entity.address.zip,
        number: entity.address.number,
        street: entity.address.street,
        city: entity.address.city
      })
    } catch (error) {
      throw error
    }
  }
  update(entity: Customer): Promise<void> {
    throw new Error("Method not implemented.");
  }
  find(id: string): Promise<Customer> {
    throw new Error("Method not implemented.");
  }
  findAll(): Promise<Customer[]> {
    throw new Error("Method not implemented.");
  }

}