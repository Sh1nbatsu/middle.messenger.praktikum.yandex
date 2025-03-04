import EventBus from "./EventBus";
export default class Block {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render",
  };

  private _element: HTMLElement;
  private _meta;
  eventBus;
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

  private _registerEvents(eventBus) {
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

  componentDidMount(oldProps?) {}

  dispatchComponentDidMount() {
    Object.values(this._children).forEach((child) => {
      child.dispatchComponentDidMount();
    });

    this.eventBus.emit(Block.EVENTS.FLOW_CDM);
  }

  private _componentDidUpdate(oldProps, newProps) {
    if (!this._isComponentMounted) {
      return;
    }

    const response = this.componentDidUpdate(oldProps, newProps);
    if (!response) {
      return;
    }
    this.eventBus.emit(Block.EVENTS.FLOW_RENDER);
  }

  componentDidUpdate(oldProps, newProps) {
    return true;
  }

  setProps = (nextProps) => {
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
        const boundHandler = (e) => {
          handler.call(this, e, this._element);
        };

        const elements = this._element.querySelectorAll(selector);
        elements.forEach((element) => {
          element.addEventListener(event, boundHandler);
        });
      });
    }
  }

  private _removeEvents() {
    const { events = [] } = this.props;

    if (Array.isArray(events)) {
      events.forEach(({ selector, event, handler }) => {
        const boundHandler = (e) => {
          handler.call(this, e, this._element);
        };

        const elements = this._element.querySelectorAll(selector);
        elements.forEach((element) => {
          element.removeEventListener(event, boundHandler);
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

  private _makePropsProxy(props) {
    const self = this;

    return new Proxy(props, {
      get(target, prop) {
        const value = target[prop];
        return typeof value === "function" ? value.bind(target) : value;
      },
      set(target, prop, value) {
        const oldValue = target[prop];
        target[prop] = value;

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

  private _createDocumentElement(tagName) {
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
