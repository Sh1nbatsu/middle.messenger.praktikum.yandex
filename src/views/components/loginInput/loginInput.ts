import Block from "../../../core/Block.ts";
import Handlebars from "handlebars";
import loginInputPartial from "./loginInput.partial.ts";

interface Event {
  selector: string;
  event: string;
  handler: (e: Event, componentElement?: HTMLElement) => void;
}

export interface LoginInputProps {
  inputDesc?: string;
  inputType: string;
  inputName: string;
  errorMessage?: string;
  listeningElement?: string;
  events?: Event[];
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
