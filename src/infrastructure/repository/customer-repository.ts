import { Customer } from "../../domain/entity/customer";
import Address from "../../domain/entity/valueObjects/address";
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
  async find(id: string): Promise<Customer> {
    try {
      const customer = await CustomerModel.findOne({ where: { id } })

      if (!customer) {
        throw new Error("Customer not found")
      }

      const customerAddress = new Address(customer.street, customer.number, customer.zip, customer.city);
      return new Customer(customer.id, customer.name, customer.email, customerAddress)
    } catch (error) {
      throw error
    }
  }
  findAll(): Promise<Customer[]> {
    throw new Error("Method not implemented.");
  }

}