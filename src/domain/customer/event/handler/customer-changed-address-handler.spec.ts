import CustomerChangedAddressHandler from "./customer-changed-address-handler";

describe("Customer Created Event Handler 1", () => {
  let consoleSpy: any;
  let handler: CustomerChangedAddressHandler;

  beforeEach(() => {
    consoleSpy = jest.spyOn(console, "log")
    handler = new CustomerChangedAddressHandler();
  })

  it("should print message when customer changed address handler is called", () => {
    handler.handle({
      dataTimeOccurred: new Date(),
      eventData: {
        id: 'CustomerID',
        name: 'CustomerName',
        address: 'CustomerAddress'
      }
    });
    expect(consoleSpy).toHaveBeenCalledWith(
      "Endereço do cliente: CustomerID, CustomerName alterado para: CustomerAddress"
    )
  })
})