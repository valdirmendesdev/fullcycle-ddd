import EventInterface from "../../@shared/event/event.interface";

interface CustomerChangedAddressData {
  id: string,
  name: string,
  address: string
}

export default class CustomerChangedAddressEvent implements EventInterface {
  dataTimeOccurred: Date;
  eventData: CustomerChangedAddressData;

  constructor(eventData: any) {
    this.dataTimeOccurred = new Date();
    this.eventData = eventData;
  }
}