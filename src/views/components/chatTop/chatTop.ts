import Block from "../../../core/Block.ts";
import Handlebars from "handlebars";
import chatTopPartial from "./chatTop.partial.ts";
import { CustomEvent } from "../../../core/Block.ts";

export interface ChatTopProps {
  name: string;
  pfpUrl: string;
  events?: CustomEvent[];
}

export default class ChatTop extends Block {
  constructor(props: ChatTopProps) {
    super("div", {
      ...props,
    });
  }

  render(): string {
    const compiledTemplate = Handlebars.compile(chatTopPartial);
    return compiledTemplate(this.props);
  }
}
