export default class OrderItem {
  _id: string
  _name: string
  _price: number
  _productId: string
  _quantity: number

  constructor(id: string, name: string, price: number, productId: string, quantity: number) {
    this._id = id
    this._name = name
    this._price = price
    this._productId = productId
    this._quantity = quantity
    this.validate()
  }

  get id(): string {
    return this._id
  }

  get name(): string {
    return this._name
  }

  get price(): number {
    return this._price
  }

  get productId(): string {
    return this._productId
  }

  get quantity(): number {
    return this._quantity
  }

  getTotal(): number {
    return this._price * this._quantity;
  }

  validate() {
    if (this._id === "") {
      throw new Error("Order item id is required")
    }
    if (this._name === "") {
      throw new Error("Order item name is required")
    }
    if (this._price === 0) {
      throw new Error("Order item price must be greater than zero")
    }
    if (this._productId === "") {
      throw new Error("Order item product id is required")
    }
    if (this._quantity <= 0) {
      throw new Error("Order item quantity must be greater than zero")
    }
  }
}