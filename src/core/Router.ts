import Route from "./Route";

class Router {
  private static __instance: Router;
  private routes: Route[] = [];
  private history = window.history;
  private _currentRoute: Route | null = null;

  constructor() {
    if (Router.__instance) {
      return Router.__instance;
    }

    Router.__instance = this;
  }

  /**
   * Регистрация нового роута:
   *   pathname — строка (URL), например "/sign-up"
   *   block — класс страницы, который будет отображаться
   */
  public use(
    pathname: string,
    PageClass: any,
    props: Record<string, any> = {}
  ): this {
    const route = new Route(pathname, PageClass, props);
    this.routes.push(route);
    return this;
  }
  /**
   * Запуск роутера:
   *  - подписываемся на событие изменения истории (onpopstate)
   *  - при первой загрузке вызываем _onRoute() для текущего URL
   */
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

  /**
   * Переход на другую страницу:
   *  - меняем состояние history
   *  - вызываем _onRoute для нового pathname
   */
  public go(pathname: string): void {
    if (window.location.pathname !== pathname) {
      this.history.pushState({}, "", pathname);
    }
    this._onRoute(pathname);
  }

  /**
   * Аналог нажатия «Назад» в браузере
   */
  public back(): void {
    this.history.back();
  }

  /**
   * Аналог нажатия «Вперёд» в браузере
   */
  public forward(): void {
    this.history.forward();
  }

  /**
   * Подбирает роут по pathname. Если роута нет – вернётся undefined
   */
  private getRoute(pathname: string): Route | undefined {
    return this.routes.find((route) => route.match(pathname));
  }

  /**
   * Основная логика переключения страниц
   */
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

    if (!route) {
      this.go("/404");
      return;
    }

    route.render();
  }
}

export default Router;
