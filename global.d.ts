import Router from "./src/core/Router";
declare module "*.scss" {
  const content: { [className: string]: string };
  export default content;
}

interface State {
  user?: unknown;
  searchResult?: unknown;
}

declare global {
  interface Window {
    router: Router;
    store: {
      getState(): State;
      setState(state: Partial<State>): void;
      on(StoreEvents, unknown): void
    };
  }
}