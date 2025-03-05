import Block from "../../../core/Block.ts";
import Handlebars from "handlebars";
import chatTopPartial from "./chatTop.partial.ts";

export interface ChatTopProps {
  name: string;
  pfpUrl: string;
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
