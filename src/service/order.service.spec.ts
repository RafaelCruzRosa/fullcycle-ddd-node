import { Customer } from "../entity/customer"
import Order from "../entity/order"
import OrderItem from "../entity/order_item"
import Address from "../entity/valueObjects/address"
import OrderService from "./order.service"

describe("Order Service", () => {
  it("should be able to get total of all orders", () => {
    const order1 = new Order("id 1", "c1", [
      new OrderItem("id 1", "name", 10, "p1", 1)
    ])

    const order2 = new Order("id 1", "c1", [
      new OrderItem("id 1", "name", 30, "p1", 2)
    ])

    const total = OrderService.getTotal([order1, order2]);

    expect(total).toEqual(70)
  })

  it("should be able to place order", () => {
    const customer = new Customer("id", "name", "email@email.com", new Address("street", 1, "123-123", "rj"))
    const orderItem = new OrderItem("id", "name", 10, "p1", 1)

    const order = OrderService.placeOrder(customer, [orderItem])

    expect(order.total()).toEqual(10)
    expect(customer.rewardPoints).toEqual(5)
  })

  it("should not be able to place order without items", () => {
    expect(() => {
      const customer = new Customer("id", "name", "email@email.com", new Address("street", 1, "123-123", "rj"))

      OrderService.placeOrder(customer, [])
    }).toThrow("Order must have at least one item")
  })
})