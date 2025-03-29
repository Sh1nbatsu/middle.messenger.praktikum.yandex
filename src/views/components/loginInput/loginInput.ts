import Block from "../../../core/Block.ts";
import Handlebars from "handlebars";
import loginInputPartial from "./loginInput.partial.ts";

import { CustomEvent } from "../../../core/Block.ts";

export interface LoginInputProps {
  inputDesc?: string;
  inputType: string;
  inputName: string;
  errorMessage?: string;
  listeningElement?: string;
  events?: CustomEvent[];
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
