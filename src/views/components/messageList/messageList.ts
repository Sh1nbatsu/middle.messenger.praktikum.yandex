import Block from "../../../core/Block.ts";
import Handlebars from "handlebars";
import messageListPartial from "./messageList.partial.ts";

import Message from "../message/message.ts";

import { MessageProps } from "../message/message.ts";
export default class MessageList extends Block {
  constructor(props?: MessageProps[]) {
    super("div", props);
  }

  init() {
    super.init();

    const messages = [
      {
        date: "17 may",
      },
      {
        youSend: true,
        messageTime: "13:37",
        messageText: "loremkp[aodsp[kosdasakod[",
      },
      {
        messageTime: "13:37",
        messageText: "loremkp[aodsp[kosdasakod[",
      },
    ];

    messages.forEach((item, index) => {
      const message = new Message({
        date: item.date,
        youSend: item.youSend,
        messageText: item.messageText,
        messageTime: item.messageTime,
      });

      this.registerChild(`Message${index}`, message);
    });
  }

  render(): string {
    const context: { [key: string]: string | string[] } = {};

    Object.entries(this._children).forEach(([name]) => {
      context[name] = `<div data-component-id="${name}"></div>`;
    });

    const contextEntries = Object.entries(context);

    const childrenList: string[] = [];

    contextEntries.forEach((child: [string, string | string[]]) => {
      console.log(child);

      if (typeof child[1] === "string") {
        childrenList.push(child[1]);
      } else {
        childrenList.push(...child[1]);
      }
    });

    // Ненужная логика из за устаревшего подхода, я разберусь с ней потом, надеюсь

    context.children = childrenList;

    console.log(context);

    return Handlebars.compile(messageListPartial)(context);
  }
}
