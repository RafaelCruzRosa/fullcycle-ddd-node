import Order from "./order"
import OrderItem from "./order_item"

describe("Order domain test", () => {
  it("Should throw error if id is empty", () => {
    expect(() => {
      const orderItem = new OrderItem("item1", "item", 10, "p1", 10)
      const order = new Order("", "123", [orderItem])
    }).toThrow("Order id is required")
  })

  it("Should throw error if customerId is empty", () => {
    expect(() => {
      const orderItem = new OrderItem("item1", "item", 10, "p1", 10)
      const order = new Order("123", "", [orderItem])
    }).toThrow("Order customer id is required")
  })

  it("Should throw error if quantity of order items is zero", () => {
    expect(() => {
      const order = new Order("123", "1", [])
    }).toThrow("Order must have at least 1 item")
  })

  it("Should throw error if orderId is empty", () => {
    expect(() => {
      const orderItem = new OrderItem("", "name", 10, "p1", 1)
    }).toThrow("Order item id is required")
  })

  it("Should throw error if name is empty", () => {
    expect(() => {
      const orderItem = new OrderItem("123", "", 10, "p1", 1)
    }).toThrow("Order item name is required")
  })

  it("Should throw error if price is zero", () => {
    expect(() => {
      const orderItem = new OrderItem("123", "name", 0, "p1", 1)
    }).toThrow("Order item price must be greater than zero")
  })

  it("Should throw error if productId is empty", () => {
    expect(() => {
      const orderItem = new OrderItem("123", "name", 10, "", 1)
    }).toThrow("Order item product id is required")
  })

  it("Should throw error if quantity is equal zero", () => {
    expect(() => {
      const orderItem = new OrderItem("123", "name", 10, "p1", 0)
    }).toThrow("Order item quantity must be greater than zero")
  })

  it("Should throw error if quantity is less than zero", () => {
    expect(() => {
      const orderItem = new OrderItem("123", "name", 10, "p1", -1)
    }).toThrow("Order item quantity must be greater than zero")
  })

  it("Should be able to get total from order item", () => {
    const orderItem = new OrderItem("123", "name", 100, "p1", 2)
    expect(orderItem.getTotal()).toEqual(200)
  })

  it("Should be able to get total form order", () => {
    const orderItem1 = new OrderItem("12", "name", 100, "p1", 2)
    const orderItem2 = new OrderItem("13", "name", 200, "p1", 2)

    const order = new Order("id", "c1", [orderItem1, orderItem2])

    expect(order.total()).toEqual(600)
  })

  it("should be able to add an item to order", () => {
    const orderItem1 = new OrderItem("12", "name", 100, "p1", 2)
    const orderItem2 = new OrderItem("13", "name", 200, "p1", 2)

    const order = new Order("id", "c1", [orderItem1])

    order.addItem(orderItem2)

    expect(order.items).toEqual([orderItem1, orderItem2])
  })
})