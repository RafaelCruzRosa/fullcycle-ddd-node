export default class Product {
  _id: string
  _name: string
  _price: number

  constructor(id: string, name: string, price: number) {
    this._id = id
    this._name = name
    this._price = price
    this.validate()
  }


  changeName(name: string) {
    this._name = name
    this.validate()
  }

  changePrice(price: number) {
    this._price = price
    this.validate()
  }

  validate() {
    if (this._id === "") {
      throw new Error("Product id is required")
    }
    if (this._name === "") {
      throw new Error("Product name is required")
    }
    if (this._price === 0) {
      throw new Error("Product price must be greater than zero")
    }
  }

  get name(): string {
    return this._name
  }

  get price(): number {
    return this._price
  }

  get id(): string {
    return this._id
  }
}