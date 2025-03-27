import Block from "../../../core/Block.ts";
import Handlebars from "handlebars";
import chatItemPartial from "./chatItem.partial.ts";
import { CustomEvent } from "../../../core/Block.ts";

export interface ChatItemProps {
  pfpUrl: string | null;
  chatName: string| null;
  youSend?: boolean| null;
  lastData: string| null;
  unreadAmount?: number| null;
  lastTime: string| null;
  id: number| null;
  events?: CustomEvent[]| null;
}

export default class ChatItem extends Block {
  constructor(props?: ChatItemProps) {
    super("div", {
      ...props,
    });
  }

  render(): string {
    const compiledTemplate = Handlebars.compile(chatItemPartial);
    return compiledTemplate(this.props);
  }
}
