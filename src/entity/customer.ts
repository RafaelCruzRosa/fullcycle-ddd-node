import Address from "./valueObjects/address";

export class Customer {
  _id: string;
  _name: string;
  _email: string;
  _address: Address


  constructor(_id: string, _name: string, _email: string, address: Address) {
    this._id = _id;
    this._name = _name;
    this._email = _email;
    this._address = address
    this.validate()
  }

  changeName(newName: string): void {
    this._name = newName
    this.validate()
  }

  changeEmail(newEmail: string): void {
    this._email = newEmail
    this.validate()
  }

  changeAddress(newAddress: Address): void {
    this._address = newAddress
    this.validate()
  }

  validate() {
    if (this._id === "") {
      throw new Error("Customer id is required")
    }
    if (this._email === "") {
      throw new Error("Customer email is required")
    }
    if (this._name === "") {
      throw new Error("Customer name is required")
    }
    if (!this._address) {
      throw new Error("Customer address is required")
    }
  }

  get name(): string {
    return this._name
  }

  get email(): string {
    return this._email
  }

  get address(): Address {
    return this._address
  }
}
