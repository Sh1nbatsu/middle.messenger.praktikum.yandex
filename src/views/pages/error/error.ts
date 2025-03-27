import Block, { BlockProps } from "../../../core/Block";
import errorPageTemplate from "./errorPage.template";
import Handlebars from "handlebars";

interface ErrorProps extends BlockProps {
  errorType?: number | string;
  errorDesc?: string;
}

export default class Error extends Block {
  constructor(tagName: string = "div", props: ErrorProps = {}) {
    super(tagName, {
      errorType: props.errorType ?? "500",
      errorDesc: props.errorDesc ?? "Something went wrong",
    });
  }

  init() {
    super.init();
  }

  render(): string {
    return Handlebars.compile(errorPageTemplate)(this.props);
  }
}
