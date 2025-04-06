import Handlebars from "handlebars";

import Router from "./Router";

import { expect } from "chai";

import Block, { BlockProps } from "./Block";

import Sinon from "sinon";

class MockPage1 extends Block {
  constructor(tagName: string = "div", props: BlockProps = {}) {
    super(tagName, props);
  }

  render() {
    const compiledTemplate = Handlebars.compile(`
          <div>
            <p>Page 1 text</p>
            <button>Click</button>
          </div>`);
    return compiledTemplate(this.props);
  }
}

class MockPage2 extends Block {
  constructor(tagName: string = "div", props: BlockProps = {}) {
    super(tagName, props);
  }

  render() {
    const compiledTemplate = Handlebars.compile(`
          <div>
            <p>Page 2 text</p>
            <button>Click</button>
          </div>`);
    return compiledTemplate(this.props);
  }
}

describe("Router", () => {
  let Mock: Router;

  beforeEach(() => {
    document.body.innerHTML = `<div id="root"></div>`;
    window.store = {
      getState: () => ({}),
      setState: Sinon.stub(),
    };

    class MockRouter extends Router {
      constructor() {
        super();
      }

      back() {
        super.back();
        if (typeof window.onpopstate === "function") {
          window.onpopstate({
            currentTarget: window,
          } as unknown as PopStateEvent);
        }
      }

      forward() {
        super.forward();
        if (typeof window.onpopstate === "function") {
          window.onpopstate({
            currentTarget: window,
          } as unknown as PopStateEvent);
        }
      }
    }

    Mock = new MockRouter();
  });

  it("Router should be singleton", () => {
    const router1 = new Router();
    const router2 = new Router();
    expect(router1).to.equal(router2);
  });

  it("Router should render pages correctly", () => {
    Mock.use("/", MockPage1, {}).start();

    const pText = document.querySelector("p")?.innerHTML;
    expect(pText).to.be.eq("Page 1 text");
  });

  it("Router should navigate to different pages", () => {
    Mock.use("/", MockPage1, {}).use("/sign-up", MockPage2, {}).start();
    Mock.go("/sign-up");
    const pText = document.querySelector("p")?.innerHTML;
    expect(pText).to.be.eq("Page 2 text");
  });

  it("Router should support forward and back navigation", async () => {
    Mock.use("/", MockPage1, {}).use("/sign-up", MockPage2, {}).start();
    Mock.go("/");
    Mock.back();
    await new Promise((resolve) => setTimeout(resolve, 10));
    const pText = document.querySelector("p")?.innerHTML;
    expect(pText).to.be.eq("Page 2 text");
    Mock.forward();
    await new Promise((resolve) => setTimeout(resolve, 10));
    const pText2 = document.querySelector("p")?.innerHTML;
    expect(pText2).to.be.eq("Page 1 text");
  });
});
