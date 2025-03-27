// @ts-nocheck
// @ts-ignore

import { StoreEvents } from "../core/Store";
import isEqual from "./isEqual";
type BlockConstructor<T extends Block = Block> = new (props: unknown) => T;

export function connect<P extends Record<string, unknown>>(
  mapStateToProps: (state: unknown) => P
) {
  return function <T extends BlockConstructor>(Component: T): T {
    return class extends Component {
      private onChangeStoreCallback: () => void;

      constructor(props: unknown) {
        const store = window.store;
        let state = mapStateToProps(store.getState());

        super({ ...props, ...state });

        this.onChangeStoreCallback = () => {
          const newState = mapStateToProps(store.getState());
          if (!isEqual(state, newState)) {
            console.log(`Store updated for ${Component.name}`, newState);
            this.setProps({ ...newState });
            state = newState;
          }
        };

        store.on(StoreEvents.Updated, this.onChangeStoreCallback);
      }

      setProps(nextProps: unknown) {
        super.setProps(nextProps);
      }

      componentWillUnmount() {
        if (super.componentWillUnmount) {
          super.componentWillUnmount();
        }
        window.store.off(StoreEvents.Updated, this.onChangeStoreCallback);
      }
    } as T;
  };
}
