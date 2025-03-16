import Route from "./Route";

class Router {
  private static __instance: Router;
  private routes: Route[] = [];
  private history = window.history;
  // private _currentRoute: Route | null = null;

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
        const path = target.getAttribute("href");
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
    this.history.pushState({}, "", pathname);
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
    if (!route) {
      if (pathname !== "/404") {
        this.go("/404");
        return;
      }
      return;
    }

    this._currentRoute = route;
    route.render();
  }
}

export default Router;
