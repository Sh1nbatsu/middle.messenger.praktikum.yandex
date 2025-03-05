import Block from "../../../core/Block.ts";
import Handlebars from "handlebars";
import chatItemPartial from "./chatItem.partial.ts";


export interface ChatItemProps {
  pfpUrl: string;
  chatName: string;
  youSend?: boolean;
  lastData: string;
  unreadAmount?: number;
  lastTime: string;
}

export default class ChatItem extends Block {
  constructor(props: ChatItemProps) {
    super("div", {
      ...props,
    });
  }

  render(): string {
    const compiledTemplate = Handlebars.compile(chatItemPartial);
    return compiledTemplate(this.props);
  }
}
