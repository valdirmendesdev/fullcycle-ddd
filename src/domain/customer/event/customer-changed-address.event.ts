import EventInterface from "../../@shared/event/event.interface";

export interface CustomerChangedAddressData {
  id: string,
  name: string,
  address: string
}

export default class CustomerChangedAddressEvent implements EventInterface {
  dataTimeOccurred: Date;
  eventData: CustomerChangedAddressData;

  constructor(eventData: CustomerChangedAddressData) {
    this.dataTimeOccurred = new Date();
    this.eventData = eventData;
  }
}