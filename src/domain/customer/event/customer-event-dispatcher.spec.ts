import CustomerEventDispatcher from './customer-event-dispatcher';
import CustomerCreatedEvent from './customer-created.event';
import CustomerCreatedEventHandler1 from './handler/customer-created-handler1';
import CustomerCreatedEventHandler2 from './handler/customer-created-handler2';
import Customer from '../entity/customer';
import CustomerChangedAddressHandler from './handler/customer-changed-address-handler';
import Address from '../value-object/address';
import { CustomerCreatedEventData } from './customer-created.event';
import { CustomerChangedAddressData } from './customer-changed-address.event';
import CustomerChangedAddressEvent from './customer-changed-address.event';

describe("Customer Event Dispatcher tests", () => {

  let dispatcher: CustomerEventDispatcher;
  let customer: Customer;

  beforeAll(() => {
    dispatcher = CustomerEventDispatcher.GetInstance();
    dispatcher.unregisterAll();
  })

  it("Should returns the same instance when GetInstance is called", () => {
    const secondInstance = CustomerEventDispatcher.GetInstance();
    expect(secondInstance).toMatchObject(dispatcher);
  })

  it("should notify the CustomerCreated event handlers when a new customer object is created", () => {
    const handler1 = new CustomerCreatedEventHandler1();
    const handler2 = new CustomerCreatedEventHandler2();
    const handler1Spy = jest.spyOn(handler1, "handle");
    const handler2Spy = jest.spyOn(handler2, "handle");

    dispatcher.register(CustomerCreatedEvent.name, handler1);
    dispatcher.register(CustomerCreatedEvent.name, handler2);

    customer = new Customer("customerId", "customerName");
    const eventData = {
      eventData: {
        id: customer.id,
        name: customer.name
      } as CustomerCreatedEventData
    }

    expect(handler1Spy).toBeCalledWith(expect.objectContaining(eventData));
    expect(handler2Spy).toBeCalledWith(expect.objectContaining(eventData));
  })

  it("should notify the CustomerChangedAddress event handlers when the address of a customer object is chagend", () => {
    const handler = new CustomerChangedAddressHandler();
    const spy = jest.spyOn(handler, "handle");

    dispatcher.register(CustomerChangedAddressEvent.name, handler);

    customer = new Customer("customerID", "customerName");
    customer.changeAddress(new Address("street", 123, "zip", "city"));

    const eventData = {
      eventData: {
        id: customer.id,
        name: customer.name,
        address: customer.Address.toString()
      } as CustomerChangedAddressData
    }

    expect(spy).toBeCalledWith(expect.objectContaining(eventData));
  })
})