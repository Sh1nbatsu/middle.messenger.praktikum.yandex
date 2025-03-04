import Block from "../../../core/Block.ts";
import Handlebars from "handlebars";
import editInputPartial from "./editInput.partial.ts";

interface event {
  selector: string;
  event: string;
  handler: (e: unknown, componentElement?: HTMLElement) => void;
}

export interface editInputProps {
  inputDesc?: string;
  inputType: string;
  inputName: string;
  placeholder?: string;
  errorMessage?: string;
  listeningElement?: string;
  required?: boolean;
  events?: event[];
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
