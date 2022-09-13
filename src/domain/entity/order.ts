import OrderItem from "./order_item"

export default class Order {
  _id: string
  _customerId: string
  _items: OrderItem[]

  constructor(id: string, customerId: string, orderItems: OrderItem[]) {
    this._id = id
    this._customerId = customerId
    this._items = orderItems
    this.validate()
  }

  get id(): string {
    return this._id
  }

  get customerId(): string {
    return this._customerId
  }

  get items(): OrderItem[] {
    return this._items
  }

  total(): number {
    return this._items.reduce((total, item) => item.getTotal() + total, 0)
  }

  addItem(newItem: OrderItem): void {
    this._items.push(newItem)
  }

  validate() {
    if (this._id === "") {
      throw new Error("Order id is required")
    }
    if (this._customerId === "") {
      throw new Error("Order customer id is required")
    }
    if (this._items.length === 0) {
      throw new Error("Order must have at least 1 item")
    }
  }
}