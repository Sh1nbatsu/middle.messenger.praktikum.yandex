import Block, { BlockProps } from "../../../core/Block.ts";
import Handlebars from "handlebars";
import chatListPartial from "./chatList.partial.ts";

import ChatItem from "../chatItem/chatItem.ts";
import { connect } from "../../../utils/connect.ts";
import { GetChatToken } from "../../../domain/chats/chatsController.ts";
import { StoreTypes } from "../../../core/Store.ts";
import coreDomain from "../../../domain/coreDomain.ts";

export interface Chats {
  avatar: string | null;
  created_by: number | null;
  id: number | null;
  last_message: Record<string, string> | null;
  title: string | null;
  unread_count: number | null;
}
export class ChatList extends Block {
  constructor(props: BlockProps = {}) {
    super("div", props);
  }

  init() {
    super.init();

    this.updateChatItems(window.store.getState().chats);
  }

  componentDidUpdate(oldProps: BlockProps, newProps: BlockProps) {
    if (oldProps.chats !== newProps.chats) {
      this.updateChatItems(newProps.chats as Chats[]);
      return true;
    } else {
      return false;
    }
  }

  updateChatItems(chats: Chats[]) {
    Object.values(this._children).forEach((child) => child.destroy());
    this._children = {};

    chats.forEach((item, index) => {
      let avatar: string;
      if (item.avatar) {
        avatar = `https://${coreDomain}/api/v2/resources${item.avatar}`;
      } else {
        avatar = "./mock_avatar.png";
      }

      console.log(item, "Initialising chatItem");
      let date: string | null;
      const options: Intl.DateTimeFormatOptions = {
        hour: "2-digit",
        minute: "2-digit",
      };

      if (item.last_message && item.last_message.time) {
        date = new Date(item.last_message.time).toLocaleTimeString(
          "ru-RU",
          options
        );
      } else {
        date = null;
      }

      let youSend: boolean;

      if (window.store.getState().user.id == item.last_message?.id) {
        youSend = true;
      } else {
        youSend = false;
      }

      const chatItem = new ChatItem({
        pfpUrl: avatar,
        chatName: item.title || null,
        lastData: item.last_message?.content || "",
        lastTime: date || null,
        youSend: youSend || null,
        unreadAmount: item.unread_count || null,
        id: item.id || null,
        events: [
          {
            selector: "li",
            event: "click",
            handler: () => {
              window.store.setState({ currentChat: item });
              GetChatToken();
            },
          },
        ],
      });

      this.registerChild(`ChatItem${index}`, chatItem);

      if (index === 0) {
        window.store.setState({ currentChat: item });
        GetChatToken();
      }
    });

    this.eventBus.emit(Block.EVENTS.FLOW_RENDER);
  }

  render(): string {
    const context: { [key: string]: string | string[] } = {};

    Object.entries(this._children).forEach(([name]) => {
      context[name] = `<div data-component-id="${name}"></div>`;
    });

    const contextEntries = Object.entries(context);

    const childrenList: string[] = [];

    contextEntries.forEach((child: [string, string | string[]]) => {
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

const mapStateToProps = (state: unknown) => {
  return {
    chats:  (state as StoreTypes).chats,
  };
};

export default connect(mapStateToProps)(ChatList);
