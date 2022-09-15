import CustomerCreatedEvent from "../customer/customer-created.event"
import EnviaConsoleLog1Handler from "../customer/handler/envia-console-log1-handler"
import EventDispatcher from "./event-dispatcher"

describe("Domain events test", () => {
  it("should be able to register an event", () => {
    const customerEvent = new EnviaConsoleLog1Handler()
    const eventDispatcher = new EventDispatcher()

    eventDispatcher.register("CustomerCreatedEvent", customerEvent)

    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeDefined()

    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toEqual(1)
  })

  it("should be able to unregister an event", () => {
    const customerEvent = new EnviaConsoleLog1Handler()
    const eventDispatcher = new EventDispatcher()

    eventDispatcher.register("CustomerCreatedEvent", customerEvent)

    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toEqual(1)

    eventDispatcher.unregister("CustomerCreatedEvent", customerEvent)

    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeDefined()
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toEqual(0)
  })

  it("should be able to unregister all events", () => {
    const customerEvent = new EnviaConsoleLog1Handler()
    const eventDispatcher = new EventDispatcher()

    eventDispatcher.register("CustomerCreatedEvent", customerEvent)

    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toEqual(1)

    eventDispatcher.unregisterAll()

    expect(eventDispatcher.getEventHandlers).toEqual({})
  })

  it("should be able to notify an event", () => {
    const customerEvent = new EnviaConsoleLog1Handler()
    const customerEventSpy = jest.spyOn(customerEvent, "handle")
    const eventDispatcher = new EventDispatcher()

    eventDispatcher.register("CustomerCreatedEvent", customerEvent)

    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeDefined()

    const customerCreatedEvent = new CustomerCreatedEvent({
      id: 1,
      name: "Rafael"
    })

    eventDispatcher.notify(customerCreatedEvent)
    expect(customerEventSpy).toBeCalled()
  })
})