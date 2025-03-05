import Block from "../../../core/Block.ts";
import Handlebars from "handlebars";
import messagePartial from "./message.partial.ts";

export interface MessageProps {
  youSend?: boolean;
  date?: string;
  messageTime?: string;
  messageText?: string;
}

export default class Message extends Block {
  constructor(props: MessageProps) {
    super("div", {
      ...props,
    });
  }

  render(): string {
    const compiledTemplate = Handlebars.compile(messagePartial);
    return compiledTemplate(this.props);
  }
}
