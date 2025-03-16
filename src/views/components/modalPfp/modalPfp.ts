import Block from "../../../core/Block.ts";
import Handlebars from "handlebars";
import modalPfpPartial from "./modalPfp.partial.ts";

export interface ModalProps {
  text?: string;
}

export default class modalPfp extends Block {
  constructor(props: ModalProps) {
    super("div", {
      ...props,
    });
  }

  render(): string {
    const compiledTemplate = Handlebars.compile(modalPfpPartial);
    return compiledTemplate(this.props);
  }
}
