import Block from "../../core/Block.ts";
import Handlebars from "handlebars";
import editInputPartial from "./editInput.partial.ts";

export interface editInputProps {
  inputDesc?: string;
  inputType: string;
  inputName: string;
  placeholder?: string;
  errorMessage?: string;
  listeningElement?: string;
  required?: boolean;
  events?: {};
}

export default class EditInput extends Block {
  constructor(props: editInputProps) {
    super("div", {
      ...props,
    });
  }

  render(): string {
    const compiledTemplate = Handlebars.compile(editInputPartial);
    return compiledTemplate(this.props);
  }
}
