export default class Address {
  _street: string;
  _number: number;
  _zip: string;
  _city: string;

  constructor(street: string, number: number, zip: string, city: string) {
    this._street = street
    this._number = number
    this._city = city
    this._zip = zip
  }

  get street(): string {
    return this._street;
  }

  get city(): string {
    return this._city
  }

  get zip(): string {
    return this._zip
  }

  get number(): number {
    return this._number
  }
}