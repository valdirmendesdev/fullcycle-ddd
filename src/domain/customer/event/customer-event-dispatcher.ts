import EventDispatcher from '../../@shared/event/event-dispatcher';
export default class CustomerEventDispatcher extends EventDispatcher {

  private static customerDispatcher: CustomerEventDispatcher;

  private constructor() {
    super();
  }

  public static GetInstance(): CustomerEventDispatcher {
    if (!this.customerDispatcher) {
      this.customerDispatcher = new CustomerEventDispatcher();
    }
    return this.customerDispatcher;
  }

}