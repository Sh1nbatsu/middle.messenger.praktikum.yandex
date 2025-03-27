import Router from "./src/core/Router";
import Store from "./src/core/Store";

declare module "*.scss" {
  const content: { [className: string]: string };
  export default content;
}

declare global {
  interface Window {
    router: Router;
    store: Store;
  }
}
