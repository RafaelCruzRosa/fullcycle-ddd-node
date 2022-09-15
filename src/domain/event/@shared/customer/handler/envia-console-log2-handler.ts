import { EventHandlerInterface } from "../../event-handler.interface";
import eventInterface from "../../event.interface";

export default class EnviaConsoleLog2Handler implements EventHandlerInterface {
  handle(event: eventInterface): void {
    console.log("Esse é o segundo console.log do evento: CustomerCreated");
  }
}