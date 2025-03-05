import Block from "../../../core/Block.ts";
import Handlebars from "handlebars";
import chatListPartial from "./chatList.partial.ts";

import ChatItem from "../chatItem/chatItem.ts";


export default class ChatList extends Block {
  constructor(props) {
    super("div", {
      ...props,
    });
  }

  init() {
    super.init();

    const chatItems = [
      {
        pfpUrl: "/mock_pfp2.jpg",
        chatName: "Andrew",
        lastData: "image",
        lastTime: "13:37",
        youSend: true,
      },
      {
        pfpUrl: "/mock_pfp2.jpg",
        chatName: "Andrew",
        lastData: "image",
        lastTime: "13:37",
        unreadAmount: 12,
      },
      {
        pfpUrl: "/mock_pfp2.jpg",
        chatName: "Andrew",
        lastData: "image",
        lastTime: "13:37",
      },
      {
        pfpUrl: "/mock_pfp2.jpg",
        chatName: "Andrew",
        lastData: "image",
        lastTime: "13:37",
      },
      {
        pfpUrl: "/mock_pfp2.jpg",
        chatName: "Andrew",
        lastData: "image",
        lastTime: "13:37",
      },
      {
        pfpUrl: "/mock_pfp2.jpg",
        chatName: "Andrew",
        lastData: "image",
        lastTime: "13:37",
      },
    ];

    chatItems.forEach((item, index) => {
      const chatItem = new ChatItem({
        pfpUrl: item.pfpUrl,
        chatName: item.chatName,
        lastData: item.lastData,
        lastTime: item.lastTime,
        youSend: item.youSend,
        unreadAmount: item.unreadAmount,
      });

      this.registerChild(`ChatItem${index}`, chatItem);
    });
  }

  render(): string {
    const context: { [key: string]: string | string[] } = {};

    Object.entries(this._children).forEach(([name]) => {
      context[name] = `<div data-component-id="${name}"></div>`;
    });

    const contextEntries = Object.entries(context);

    const childrenList: string[] = [];

    // Оно работает, но я абсолютно не понимаю как это типизировать

    contextEntries.forEach((child: [string, string | string[]]) => {
      console.log(child);

      if (typeof child[1] === "string") {
        childrenList.push(child[1]);
      } else {
        childrenList.push(...child[1]);
      }
    });

    context.children = childrenList;

    console.log(context);

    return Handlebars.compile(chatListPartial)(context);
  }
}
