import OrderItem from "./order_item"

export default class Order {
  _id: string
  _customerId: string
  _orderItems: OrderItem[]

  constructor(id: string, customerId: string, orderItems: OrderItem[]) {
    this._id = id
    this._customerId = customerId
    this._orderItems = orderItems
    this.validate()
  }

  validate() {
    if (this._id === "") {
      throw new Error("Order id is required")
    }
    if (this._customerId === "") {
      throw new Error("Order customer id is required")
    }
    if (this._orderItems.length === 0) {
      throw new Error("Order must have at least 1 item")
    }
  }
}