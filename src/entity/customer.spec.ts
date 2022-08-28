import { Customer } from "./customer";
import Address from "./valueObjects/address";

describe("Customer domain", () => {
  it("Should throw error if name is empty", () => {
    expect(() => {
      const address = new Address("street", 1090, "zip", "rj")
      const customer = new Customer("123", "", "email@email.com", address);
    }).toThrow("Customer name is required")
  });

  it("Should throw error if id is empty", () => {
    expect(() => {
      const address = new Address("street", 1090, "zip", "rj")
      const customer = new Customer("", "name", "email@email.com", address);
    }).toThrow("Customer id is required")
  });

  it("Should throw error if email is empty", () => {
    expect(() => {
      const address = new Address("street", 1090, "zip", "rj")
      const customer = new Customer("123", "name", "", address);
    }).toThrow("Customer email is required")
  });

  it("Should be able to change name", () => {
    const address = new Address("street", 1090, "zip", "rj")
    const customer = new Customer("123", "name", "email@email.com", address)
    customer.changeName("new name")
    expect(customer.name).toEqual("new name")
  })

  it("Should be able to change email", () => {
    const address = new Address("street", 1090, "zip", "rj")
    const customer = new Customer("123", "name", "email@email.com", address)
    customer.changeEmail("newemail@email.com")
    expect(customer.email).toEqual("newemail@email.com")
  })

  it("Should be able to change address", () => {
    const address = new Address("street", 1090, "zip", "rj")
    const customer = new Customer("123", "name", "valid@email.com", address)

    const newAddress = new Address("street", 10, "zip", "sp")
    customer.changeAddress(newAddress)

    expect(customer.address).toStrictEqual(newAddress)
  })
});
