import { Customer } from "../../../entity/customer";
import EventInterface from "../event.interface";

export default class CustomerChangedAddressEvent implements EventInterface {
  dataTimeOccurred: Date;
  eventData: any;

  constructor(eventData: Customer) {
    this.dataTimeOccurred = new Date()
    this.eventData = eventData
  }
}