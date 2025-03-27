import Block from "./Block";
import Route from "./Route";

class Router {
  private static __instance: Router;
  private routes: Route[] = [];
  private history = window.history;

  constructor() {
    if (Router.__instance) {
      return Router.__instance;
    }

    Router.__instance = this;
  }

  public use(
    pathname: string,
    PageClass: typeof Block,
    props: Record<string, unknown> = {}
  ): this {
    const route = new Route(pathname, PageClass, props);
    this.routes.push(route);
    return this;
  }

  public start(): void {
    window.onpopstate = (event: PopStateEvent) => {
      const target = event.currentTarget as Window;
      this._onRoute(target.location.pathname);
    };

    document.addEventListener("click", (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const link = target.closest("a") as HTMLAnchorElement | null;
      console.log(link);

      if (link && link.getAttribute("href")) {
        event.preventDefault();
        const path = link.getAttribute("href");
        if (path) {
          this.go(path);
        }
        return;
      }
    });

    this._onRoute(window.location.pathname);
  }


  public go(pathname: string): void {
    if (window.location.pathname !== pathname) {
      this.history.pushState({}, "", pathname);
    }
    this._onRoute(pathname);
  }

  public back(): void {
    this.history.back();
  }


  public forward(): void {
    this.history.forward();
  }

  private getRoute(pathname: string): Route | undefined {
    return this.routes.find((route) => route.match(pathname));
  }

  private _onRoute(pathname: string): void {
    const route = this.getRoute(pathname);
    const user = window.store?.getState()?.user;

    if ((pathname === "/" || pathname === "/sign-up") && user) {
      this.go("/messenger");
      return;
    }

    if (!(pathname == "/" || pathname == "/sign-up") && !user) {
      this.go("/");
      return;
    }

    if (pathname !== "/") {
      window.store.setState({ searchResult: null });
    }

    if (!route) {
      this.go("/404");
      return;
    }

    route.render();
  }
}

export default Router;
