import SendToConsoleLog2Handler from './send-to-console-log-2-handler';
describe("Customer Created Event Handler 1", () => {
  let consoleSpy: any;
  let handler: SendToConsoleLog2Handler;

  beforeEach(() => {
    consoleSpy = jest.spyOn(console, 'log')
    handler = new SendToConsoleLog2Handler();
  })

  it("should print message when handler 2 is called", () => {
    handler.handle({
      dataTimeOccurred: new Date(),
      eventData: {}
    });
    expect(consoleSpy).toHaveBeenCalledWith(
      'Esse é o segundo console.log do evento: CustomerCreated'
    )
  })
})