import EventBus from "./EventBus";

export default class Block {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render",
  };

  _element: HTMLElement;
  _meta;
  eventBus;
  props;
  _isComponentMounted: boolean = false;
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

  _registerEvents(eventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  _createResources() {
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

  _componentDidMount() {
    if (this._isComponentMounted) {
      return;
    }

    this._isComponentMounted = true;
    this.componentDidMount();

    // Only render once after mounting
    this.eventBus.emit(Block.EVENTS.FLOW_RENDER);
  }

  componentDidMount(oldProps?) {}

  dispatchComponentDidMount() {
    Object.values(this._children).forEach((child) => {
      child.dispatchComponentDidMount();
    });

    this.eventBus.emit(Block.EVENTS.FLOW_CDM);
  }

  _componentDidUpdate(oldProps, newProps) {
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

  _render() {
    console.log(
      `Rendering ${this.constructor.name} with ${
        Object.keys(this._children).length
      } children`
    );

    const block = this.render();

    if (block !== undefined) {
      this._removeEvents();
      this._element.innerHTML = block;
      this._addEvents();
    }

    this._renderChildren();
    this._addEvents();
  }

  _renderChildren() {}

  _addEvents() {
    console.log(this._children.loginInput)
  }

  _removeEvents() {
    const { events = {} } = this.props;

    Object.keys(events).forEach((eventName) => {
      this._element.removeEventListener(eventName, events[eventName]);
    });
  }

  render() {}

  getContent() {
    return this.element;
  }

  _makePropsProxy(props) {
    const self = this;

    return new Proxy(props, {
      get(target, prop) {
        const value = target[prop];
        return typeof value === "function" ? value.bind(target) : value;
      },
      set(target, prop, value) {
        const oldValue = target[prop];
        target[prop] = value;

        // Only trigger updates for actual changes if component is mounted
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

  _createDocumentElement(tagName) {
    return document.createElement(tagName);
  }

  show() {
    this.getContent().style.display = "block";
  }

  hide() {
    this.getContent().style.display = "none";
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
