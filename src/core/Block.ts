import EventBus from "./EventBus";

export interface CustomEvent {
  selector: string;
  event: string;
  handler: (e: SubmitEvent | InputEvent, componentElement: HTMLElement) => void;
}

interface BlockProps {
  events?: CustomEvent[];
  [key: string]: unknown;
}
export default class Block {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render",
  };

  private _element: HTMLElement;
  private _meta;
  eventBus: EventBus;
  props;
  private _isComponentMounted: boolean = false;
  _children: Record<string, Block> = {};

  constructor(tagName = "div", props = {}) {
    const eventBus = new EventBus();
    this._meta = {
      tagName,
      props,
    };

    this.props = this._makePropsProxy(props);
    this._element = this._createDocumentElement(tagName);
    this.eventBus = eventBus;

    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  private _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  private _createResources() {
    const { tagName } = this._meta;
    this._element = this._createDocumentElement(tagName);
  }

  init() {
    this._createResources();
  }

  registerChild(name: string, component: Block) {
    this._children[name] = component;
    this.props[name] = component;
  }

  private _componentDidMount() {
    if (this._isComponentMounted) {
      return;
    }

    this._isComponentMounted = true;
    this.componentDidMount();

    this.eventBus.emit(Block.EVENTS.FLOW_RENDER);
  }

  componentDidMount() {}

  dispatchComponentDidMount() {
    Object.values(this._children).forEach((child) => {
      child.dispatchComponentDidMount();
    });

    this.eventBus.emit(Block.EVENTS.FLOW_CDM);
  }

  private _componentDidUpdate(...args: unknown[]) {
    const [oldProps, newProps] = args as [BlockProps, BlockProps];
    if (!this._isComponentMounted) {
      return;
    }

    const response = this.componentDidUpdate(oldProps, newProps);
    if (!response) {
      return;
    }
    this.eventBus.emit(Block.EVENTS.FLOW_RENDER);
  }

  componentDidUpdate(oldProps: BlockProps, newProps: BlockProps) {
    return { oldProps, newProps };
  }

  setProps = (nextProps: BlockProps) => {
    if (!nextProps) return;

    const oldProps = { ...this.props };

    Object.assign(this.props, nextProps);

    if (this._isComponentMounted) {
      this.eventBus.emit(Block.EVENTS.FLOW_CDU, oldProps, this.props);
    }
  };

  get element() {
    return this._element;
  }

  private _render() {
    console.log(`Rendering ${this.constructor.name}`);

    this._removeEvents();
    const block = this.render();
    this._element.innerHTML = block;

    Object.entries(this._children).forEach(([name, child]) => {
      const container = this._element.querySelector(
        `[data-component-id="${name}"]`
      );
      if (container) {
        container.replaceWith(child.getContent());
      }
    });

    this._addEvents();
  }

  private _addEvents() {
    const { events = [] } = this.props;

    if (Array.isArray(events)) {
      events.forEach(({ selector, event, handler }) => {
        const boundHandler = (e: SubmitEvent | InputEvent) => {
          handler.call(this, e, this._element);
        };

        const elements = this._element.querySelectorAll(selector);
        elements.forEach((element) => {
          element.addEventListener(event, boundHandler as EventListener);
        });
      });
    }
  }

  private _removeEvents() {
    const { events = [] } = this.props;

    if (Array.isArray(events)) {
      events.forEach(({ selector, event, handler }) => {
        const boundHandler = (e: SubmitEvent | InputEvent) => {
          handler.call(this, e, this._element);
        };

        const elements = this._element.querySelectorAll(selector);
        elements.forEach((element) => {
          element.removeEventListener(event, boundHandler as EventListener);
        });
      });
    }
  }

  render(): string {
    return "";
  }

  getContent() {
    return this.element;
  }

  private _makePropsProxy(props: BlockProps) {
    const self = this;

    return new Proxy(props, {
      get(target, prop) {
        const value = target[prop as keyof typeof target];
        return typeof value === "function" ? value.bind(target) : value;
      },
      set(target, prop, value) {
        const oldValue = target[prop as keyof typeof target];
        target[prop as keyof typeof target] = value;

        if (oldValue !== value && self._isComponentMounted) {
          self.eventBus.emit(Block.EVENTS.FLOW_CDU, { ...target }, target);
        }
        return true;
      },
      deleteProperty() {
        throw new Error("Нет доступа");
      },
    });
  }

  private _createDocumentElement(tagName: string) {
    return document.createElement(tagName);
  }

  destroy() {
    this._removeEvents();

    Object.values(this._children).forEach((child) => {
      child.destroy();
    });

    this._children = {};
    this._element.remove();
  }
}
