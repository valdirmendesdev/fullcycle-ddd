import CustomerCreatedEventHandler2 from './customer-created-handler2';
describe("Customer Created Event Handler 1", () => {
  let consoleSpy: any;
  let handler: CustomerCreatedEventHandler2;

  beforeEach(() => {
    consoleSpy = jest.spyOn(console, 'log')
    handler = new CustomerCreatedEventHandler2();
  })

  it("should print message when handler 2 is called", () => {
    handler.handle({
      dataTimeOccurred: new Date(),
      eventData: {
        id: "customerId",
        name: "customerName"
      }
    });
    expect(consoleSpy).toHaveBeenCalledWith(
      'Esse é o segundo console.log do evento: CustomerCreated'
    )
  })
})