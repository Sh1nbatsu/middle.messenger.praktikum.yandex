import renderDOM from "./RenderDom";

function isEqual(lhs: unknown, rhs: unknown) {
  return lhs === rhs;
}

export default class Route {
  private _pathname: string;
  private _blockClass: any;
  private _block: any;
  private _props: any;

  constructor(pathname: string, PageClass: any, props?: Record<string, any>) {
    this._pathname = pathname;
    this._blockClass = PageClass;
    this._props = props;
  }

  /**
   * Проверяем, совпадает ли текущий путь с роутом
   */
  public match(pathname: string): boolean {
    return isEqual(pathname, this._pathname);
  }

  /**
   * Рендерим блок (страницу) внутри root-элемента.
   * Если страница ещё не была создана, создаём новый экземпляр.
   * Если уже была, просто показываем её заново.
   */
  public render(): void {
    if (this._block) {
      this._block.destroy();
    }
    this._block = new this._blockClass(this._props);
    renderDOM(this._block);
  }

  /**
   * Если нужно перейти по этому же пути снова (например, внутри приложения),
   * можем вызвать navigate. Сейчас используется в сигнатуре,
   * но по факту роутер обычно сам определяет, нужно ли перерисовывать.
   */
  public navigate(pathname: string): void {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }
}
