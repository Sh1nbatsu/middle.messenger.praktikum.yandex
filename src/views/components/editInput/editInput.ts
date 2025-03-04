import Block from "../../../core/Block.ts";
import Handlebars from "handlebars";
import editInputPartial from "./editInput.partial.ts";

interface Event {
  selector: string;
  event: string;
  handler: (e: Event, componentElement?: HTMLElement) => void;
}

export interface EditInputProps {
  inputDesc?: string;
  inputType: string;
  inputName: string;
  placeholder?: string;
  errorMessage?: string;
  listeningElement?: string;
  required?: boolean;
  events?: Event[];
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
