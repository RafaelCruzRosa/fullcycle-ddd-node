import Order from "../entity/order"
import OrderItem from "../entity/order_item"
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
})