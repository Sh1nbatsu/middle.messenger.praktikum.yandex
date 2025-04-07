import Sinon from "sinon";
import Block, { BlockProps } from "./Block";
import { expect } from "chai";
import Handlebars from "handlebars";
import { LoginInput } from "../views/components/loginInput";
import { CustomEvent } from "./Block";

describe("Block", () => {
  let MockComponent: new (props: BlockProps) => Block;

  before(() => {
    class Mock extends Block {
      constructor(props: BlockProps) {
        super("div", props);
      }

      render() {
        const compiledTemplate = Handlebars.compile(`
        <div>
          <p id="paragraph">{{text}}</p>
          <button>{{button-text}}</button>
        </div>`);
        return compiledTemplate(this.props);
      }
    }

    MockComponent = Mock;
  });

  it("Component should render with the given props", () => {
    const TestText = "lorem";

    const component = new MockComponent({
      text: TestText,
      "button-text": "Click",
    });

    const pText = component.element.querySelector("#paragraph")?.innerHTML;

    expect(pText).to.be.eq(TestText);
  });

  it("Component should update if props has changed", () => {
    const TestText = "lorem";

    const component = new MockComponent({
      text: "not lorem",
      "button-text": "Click",
    });

    component.setProps({ text: TestText });

    const pText = component.element.querySelector("#paragraph")?.innerHTML;

    expect(pText).to.be.eq(TestText);
  });

  it("Component should handle events", () => {
    const clickStub = Sinon.stub();

    const component = new MockComponent({
      text: "lorem",
      "button-text": "Click",
      events: [
        {
          event: "click",
          selector: "button",
          handler: clickStub,
        },
      ],
    });

    const event = new MouseEvent("click");

    component.element.querySelector("button")?.dispatchEvent(event);

    expect(clickStub.calledOnce).to.be.eq(true);
  });

  it("Component should dispatch componentDidMount() on DOM insertion", () => {
    const spyCDM = Sinon.spy(MockComponent.prototype, "componentDidMount");

    const component = new MockComponent({
      text: "lorem",
      "button-text": "Click",
    });

    component.getContent();

    expect(spyCDM.calledOnce).to.be.eq(true);

    spyCDM.restore();
  });
});

describe("Component with children", () => {
  let MockComponent: new (props: BlockProps) => Block;

  before(() => {
    class Mock extends Block {
      constructor(props: BlockProps) {
        super("div", props);
      }

      init() {
        super.init();

        const loginInput = new LoginInput({
          inputName: "name",
          inputType: "text",
          inputDesc: "lorem",
          events: [this.props?.event as CustomEvent],
        });

        this.registerChild("Input", loginInput);
      }

      render() {
        const context: Record<string, string> = {};

        Object.entries(this._children).forEach(([name]) => {
          context[name] = `<div data-component-id="${name}"></div>`;
        });

        return Handlebars.compile(`
          <div>
            <button>Click</button>
            {{{Input}}}
          </div>`)(context);
      }
    }

    MockComponent = Mock;
  });

  it("Component should render children properly", () => {
    const component = new MockComponent({ event: {} });

    const input = component.element.querySelector("input");

    if (input) {
      input.value = "Value";
      expect(input.value).to.be.eq("Value");
    } else {
      expect.fail("Element not found");
    }
  });

  it("Component children should update on props change", () => {
    const component = new MockComponent({ event: {} });

    component._children.Input.setProps({ inputName: "TestName" });

    const input = component.element.querySelector("input");

    if (input) {
      expect(input.name).to.be.eq("TestName");
    } else {
      expect.fail("Element not found");
    }
  });
});
