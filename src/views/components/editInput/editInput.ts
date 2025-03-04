import Block from "../../../core/Block.ts";
import Handlebars from "handlebars";
import editInputPartial from "./editInput.partial.ts";

import { CustomEvent } from "../../../core/Block.ts";

export interface EditInputProps {
  inputDesc?: string;
  inputType: string;
  inputName: string;
  placeholder?: string;
  errorMessage?: string;
  listeningElement?: string;
  required?: boolean;
  events?: CustomEvent[];
}

export default class EditInput extends Block {
  constructor(props: EditInputProps) {
    super("div", {
      ...props,
    });
  }

  render(): string {
    const compiledTemplate = Handlebars.compile(editInputPartial);
    return compiledTemplate(this.props);
  }
}
