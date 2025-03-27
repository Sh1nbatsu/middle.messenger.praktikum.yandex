import Block from "./Block";
import renderDOM from "./RenderDom";

function isEqual(lhs: unknown, rhs: unknown) {
  return lhs === rhs;
}

export default class Route {
  private _pathname: string;
  private _blockClass: typeof Block;
  public _block: Block | null;

  constructor(pathname: string, PageClass: typeof Block) {
    this._pathname = pathname;
    this._blockClass = PageClass;
    this._block = null;
  }

  public match(pathname: string): boolean {
    return isEqual(pathname, this._pathname);
  }

  public render(): void {
    if (this._block) {
      this._block.destroy();
    }
    this._block = new this._blockClass();
    renderDOM(this._block);
  }

  public navigate(pathname: string): void {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }
}
