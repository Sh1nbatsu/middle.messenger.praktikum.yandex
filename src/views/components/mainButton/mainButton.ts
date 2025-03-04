import Block from "../../../core/Block.ts";
import Handlebars from "handlebars";
import mainButtonPartial from "./mainButton.partial.ts";

export interface MainButtonProps {
  buttonType: string;
  buttonText: string;
  events?: [{
    selector: string,
    event: string,
    handler: (e: unknown, componentElement?: HTMLElement) => void;
  }];
}

export default class MainButton extends Block {
  constructor(props: MainButtonProps) {
    super("div", props);
  }

  render(): string {
    const compiledTemplate = Handlebars.compile(mainButtonPartial);
    return compiledTemplate(this.props);
  }
}
