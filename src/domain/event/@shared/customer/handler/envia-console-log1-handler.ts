import { EventHandlerInterface } from "../../event-handler.interface";
import eventInterface from "../../event.interface";

export default class EnviaConsoleLog1Handler implements EventHandlerInterface {
  handle(event: eventInterface): void {
    console.log("Esse é o primeiro console.log do evento: CustomerCreated");
  }
}