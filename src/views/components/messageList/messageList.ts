import Block, { BlockProps } from "../../../core/Block.ts";
import Handlebars from "handlebars";
import messageListPartial from "./messageList.partial.ts";
import { wsService } from "../../../services/wsService.ts";
import { WSTransportEvents } from "../../../core/websocketTransport.ts";

import Message from "../message/message.ts";

import { GetChatToken } from "../../../domain/chats/chatsController.ts";
import { connect } from "../../../utils/connect.ts";
import { StoreTypes } from "../../../core/Store.ts";

interface WSResponse {
  chat_id: number;
  content: { type?: string; message?: string } | string;
  file: Blob | null;
  id: 20;
  is_read: boolean;
  time: number;
  type: string;
  user_id: number;
}

interface UpdateProps extends BlockProps {
  __forceUpdate: string | null;
  currentChat: {
    id?: string | null;
    chatToken: {
      token: string | null;
    } | null;
  };
}

export class MessageList extends Block {
  constructor(props: BlockProps = {}) {
    super("div", props);
  }

  async connectWebSocket() {
    const { currentChat, user } = window.store.getState();

    if (!currentChat?.id || !user?.id) {
      console.error("Missing chat ID or user ID");
      return;
    }

    try {
      if (!currentChat.chatToken?.token) {
        await GetChatToken();
      }

      const token = currentChat.chatToken?.token;
      if (!token) {
        console.error("Failed to get chat token");
        return;
      }

      const url = `wss://ya-praktikum.tech/ws/chats/${user.id}/${currentChat.id}/${token}`;

      await wsService.connect(url);

      wsService.on(WSTransportEvents.MESSAGE, this.handleMessage.bind(this));
    } catch (error) {
      console.error("WebSocket connection error", error);
    }
  }

  private handleSingleMessage(item: WSResponse) {
    if (item.content === '{"type":"ping"}' || item.type === "user connected") {
      return;
    }

    console.log("Rendering single message ", item);

    const messageId = item.id || Date.now();
    const messageKey = `message_${messageId}`;

    const date = new Date(item.time);
    const options: Intl.DateTimeFormatOptions = {
      hour: "2-digit",
      minute: "2-digit",
    };

    const messageProps = {
      youSend: item.user_id === window.store.getState().user?.id,
      messageText:
        typeof item.content === "string"
          ? item.content
          : JSON.stringify(item.content),
      messageTime: date.toLocaleTimeString("ru-RU", options),
    };

    if (!this._children[messageKey]) {
      const messageComponent = new Message(messageProps);
      this.registerChild(messageKey, messageComponent);
    } else {
      this._children[messageKey].setProps(messageProps);
    }
  }

  private handleMessage(...args: unknown[]) {
    const data = args[0] as WSResponse;
    console.log("New message", data);

    if (Array.isArray(data)) {
      data.forEach((item) => {
        this.handleSingleMessage(item);
      });
      this.setProps({ __forceUpdate: Date.now() });
      return;
    }

    if (typeof data === "object" && data !== null) {
      this.handleSingleMessage(data);
      this.setProps({ __forceUpdate: Date.now() });
      return;
    }

    console.log("Received non array data", data);
  }

  componentWillUnmount() {
    wsService.off(WSTransportEvents.MESSAGE, this.handleMessage);
    return true;
  }

  init() {
    super.init();
  }

  componentDidUpdate(oldProps: UpdateProps, newProps: UpdateProps): boolean {
    if (oldProps.__forceUpdate !== newProps.__forceUpdate) {
      return true;
    }

    if (oldProps.currentChat.id !== newProps.currentChat.id) {
      this._children = {};
      this.connectWebSocket();
      return true;
    }

    if (!oldProps.currentChat || !newProps.currentChat) {
      return false;
    }

    const oldToken = oldProps.currentChat.chatToken?.token;
    const newToken = newProps.currentChat.chatToken?.token;

    const chatIdChanged = oldProps.currentChat.id !== newProps.currentChat.id;

    console.log("WebSocket update", {
      oldToken,
      newToken,
      chatIdChanged,
    });

    if (chatIdChanged || oldToken !== newToken) {
      console.log("Connecting webSocket");
      this.connectWebSocket();
      return true;
    }

    return false;
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

    context.children = childrenList.reverse();

    console.log(this._children);

    return Handlebars.compile(messageListPartial)(context);
  }
}

const mapStateToProps = (state: unknown) => {
  return {
    currentChat: (state as StoreTypes).currentChat,
  };
};

export default connect(mapStateToProps)(MessageList);
