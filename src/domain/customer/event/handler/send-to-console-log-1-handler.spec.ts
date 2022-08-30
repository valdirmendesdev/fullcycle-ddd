import SendToConsoleLog1Handler from './send-to-console-log-1-handler';
describe("Customer Created Event Handler 1", () => {
  let consoleSpy: any;
  let handler: SendToConsoleLog1Handler;

  beforeEach(() => {
    consoleSpy = jest.spyOn(console, 'log')
    handler = new SendToConsoleLog1Handler();
  })

  it("should print message when handler is called", () => {
    handler.handle({
      dataTimeOccurred: new Date(),
      eventData: {}
    });
    expect(consoleSpy).toHaveBeenCalledWith(
      'Esse é o primeiro console.log do evento: CustomerCreated'
    )
  })
})