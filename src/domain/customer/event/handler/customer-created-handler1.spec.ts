import CustomerCreatedEventHandler1 from './customer-created-handler1';
describe("Customer Created Event Handler 1", () => {
  let consoleSpy: any;
  let handler: CustomerCreatedEventHandler1;

  beforeEach(() => {
    consoleSpy = jest.spyOn(console, 'log')
    handler = new CustomerCreatedEventHandler1();
  })

  it("should print message when handler is called", () => {
    handler.handle({
      dataTimeOccurred: new Date(),
      eventData: {
        id: "customerId",
        name: "customerName"
      }
    });
    expect(consoleSpy).toHaveBeenCalledWith(
      'Esse é o primeiro console.log do evento: CustomerCreated'
    )
  })
})