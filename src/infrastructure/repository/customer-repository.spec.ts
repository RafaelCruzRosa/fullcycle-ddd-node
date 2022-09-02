import { Sequelize } from "sequelize-typescript"
import { Customer } from "../../domain/entity/customer"
import Address from "../../domain/entity/valueObjects/address"
import CustomerModel from "../db/sequelize/model/customer.model"
import CustomerRepository from "./customer-repository"

describe("Customer repository test", () => {
  let sequelize: Sequelize
  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true }
    })

    sequelize.addModels([CustomerModel])
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it("should be able to create a customer", async () => {
    const address = new Address("street", 1, "zip", "city");
    const customer = new Customer("1", "Customer 1", "customer@customer.com", address)

    const customerRepository = new CustomerRepository()

    await customerRepository.create(customer)

    const customerFromDb = await CustomerModel.findOne({
      where: { id: customer.id }
    })

    if (!customerFromDb) {
      throw new Error("Error in find customer")
    }

    expect(customerFromDb.toJSON()).toStrictEqual({
      id: customer.id,
      name: customer.name,
      email: customer.email,
      street: customer.address.street,
      zip: customer.address.zip,
      city: customer.address.city,
      number: customer.address.number
    })
  })

  it("should be able to find a customer", async () => {
    const address = new Address("street", 1, "zip", "city");
    const customer = new Customer("1", "Customer 1", "customer@customer.com", address)

    const customerRepository = new CustomerRepository()

    await customerRepository.create(customer)

    const customerFinded = await customerRepository.find(customer.id)

    expect(customerFinded).toEqual(customer)
  })
})