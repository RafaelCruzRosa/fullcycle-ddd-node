export class Customer {
  _id: string;
  _name: string;
  _email: string;

  constructor(_id: string, _name: string, _email: string) {
    this._id = _id;
    this._name = _name;
    this._email = _email;
  }

  validate() {}
}
