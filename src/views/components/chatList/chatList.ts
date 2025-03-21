import Block from "../../../core/Block.ts";
import Handlebars from "handlebars";
import chatListPartial from "./chatList.partial.ts";

import ChatItem from "../chatItem/chatItem.ts";

import { ChatItemProps } from "../chatItem/chatItem.ts";
import { connect } from "../../../utils/connect.ts";

export class ChatList extends Block {
  constructor(props?: ChatItemProps[]) {
    super("div", {
      ...props,
    });
  }

  init() {
    super.init();

    const chatItems = window.store.getState().chats;

    chatItems.forEach((item, index) => {
      const chatItem = new ChatItem({
        pfpUrl: item.avatar || "./mock_avatar.png",
        chatName: item.title || null,
        lastData: item.last_message || null,
        lastTime: item.lastTime || null,
        youSend: item.youSend || null,
        unreadAmount: item.unread_count || null,
        id: item.id || null,
        events: [
          {
            selector: "li",
            event: "click",
            handler: (e) => {
              const target = e.target as HTMLElement;
              const li = target.closest(".chat-select__item") as HTMLElement;
              const id = li.dataset.id;
              console.log(id);
            },
          },
        ],
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

    console.log(this._children);

    return Handlebars.compile(chatListPartial)(context);
  }
}

const mapStateToProps = (state) => {
  return {
    chats: state.chats,
  };
};

export default connect(mapStateToProps)(ChatList);
