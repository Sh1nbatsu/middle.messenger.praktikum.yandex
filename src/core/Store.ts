import EventBus from "./eventBus";

export enum StoreEvents {
  Updated = "Updated",
}

export default class Store extends EventBus {
  private state = {};

  constructor(defaultState) {
    if (Store.__instance) {
      return Store.__instance;
    }
    super();

    this.state = defaultState;
    this.setState(defaultState);

    Store.__instance = this;
  }

  public getState() {
    return this.state;
  }

  public setState(nextState) {
    const prevState = { ...this.state };

    this.state = { ...this.state, ...nextState };

    this.emit(StoreEvents.Updated, prevState, nextState);
  }
}
