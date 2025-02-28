import Block, { BlockProps } from "../../core/Block.ts";
import Handlebars from "handlebars";
import loginInputPartial from "./loginInput.partial.ts";

import Block, { BlockProps } from "../../core/Block.ts";
import Handlebars from "handlebars";
import loginInputPartial from "./loginInput.partial.ts";

export interface LoginInputProps extends BlockProps {
  inputDesc?: string;
  inputType: string;
  inputName: string;
  errorMessage?: string;
}

export default class LoginInput extends Block {
  constructor(props: LoginInputProps) {
    super("div", {
      ...props,
    });
  }

  render(): string {
    const compiledTemplate = Handlebars.compile(loginInputPartial);
    return compiledTemplate(this.props);
  }
}