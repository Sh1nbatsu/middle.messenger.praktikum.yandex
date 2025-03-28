import { StoreEvents } from "../core/Store";
import isEqual from "./isEqual";
import Block from "../core/Block";

type BlockConstructor<T extends Block = Block> = new (...args: any[]) => T;

export function connect<P extends Record<string, unknown>>(
  mapStateToProps: (state: unknown) => P
) {
  return function <T extends BlockConstructor>(Component: T): T {
    return class extends Component {
      private onChangeStoreCallback: () => void;

      constructor(...args: any[]) {
        const store = window.store;
        let stateFromStore = mapStateToProps(store.getState());
        super({ ...(args || {}), ...stateFromStore });

        this.onChangeStoreCallback = () => {
          const newState = mapStateToProps(store.getState());
          if (!isEqual(stateFromStore, newState)) {
            console.log(`Store updated for ${Component.name}, newState`);
            this.setProps({ ...newState });
            stateFromStore = newState;
          }
        };

        store.on(StoreEvents.Updated, this.onChangeStoreCallback);
      }

      setProps(nextProps: Record<string, unknown>): void {
        super.setProps(nextProps);
      }

      componentWillUnmount() {
        super.componentWillUnmount();
        window.store.off(StoreEvents.Updated, this.onChangeStoreCallback);
        return true;
      }
    } as T;
  };
}
