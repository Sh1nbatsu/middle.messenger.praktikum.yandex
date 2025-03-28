import { StoreEvents } from "../core/Store";
import isEqual from "./isEqual";
import Block from "../core/Block";

type BlockConstructor<T extends Block = Block> = new (...args: any[]) => T;

// Не знаю как ее исправить, так как тип any[] там необходим. Если убрать any - будет другая ошибка - a mixing class constructor should have one argument with any[] type. Тайпскрипт сам запрашивает аргумент типа any[], а линтер жалуется на него из за правила no explicit any.(насколько я понимаю)
// https://github.com/microsoft/TypeScript/issues/37142 последний пост 28 дней назад. По всей видимости все еще не исправлено.
// Прошу обратить внимание

export function connect<P extends Record<string, unknown>>(
  mapStateToProps: (state: unknown) => P
) {
  return function <T extends BlockConstructor>(Component: T): T {
    return class extends Component {
      private onChangeStoreCallback: () => void;

      constructor(...args: any[]) {
        const store = window.store;
        let stateFromStore = mapStateToProps(store.getState());
        super({ ...(args[0] || {}), ...stateFromStore });

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
