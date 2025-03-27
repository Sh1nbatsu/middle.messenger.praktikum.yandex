import { StoreEvents } from "../core/Store";
import isEqual from "./isEqual";

// Я вообще не знаю как ЭТО  типизирвать
// Я пытался - падают пропсы, которые я передаю при создании компонентов внутри других компонентом
// Что делать с mixing construtor requires single argument with rest operator ...args[any] я так и не разобрался и не смог пофиксить, в конечном итоге откатился к началу
type BlockConstructor<T extends Block = Block> = new (props: any) => T;

export function connect<P extends Record<string, any>>(
  mapStateToProps: (state: any) => P
) {
  return function <T extends BlockConstructor>(Component: T): T {
    return class extends Component {
      private onChangeStoreCallback: () => void;

      constructor(props: any) {
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

      setProps(nextProps: any) {
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
