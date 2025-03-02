import Block from "../../core/Block";
import Handlebars from "handlebars";
import messengerPageTemplate from "./messengerPage.template";

import { ChatItem } from "../../components/chatItem";

export default class Messenger extends Block {
  constructor(props = {}) {
    super("div", {
      ...props,
    });
  }

  init() {
    super.init();

    this.props.events = [
      ...(this.props.events || []),
      {
        selector: "input[name='chat_search']",
        event: "input",
        handler: (e) => {
          const searchIcon = this.element.querySelector(
            ".search_icon"
          ) as HTMLImageElement;
          if (e.target.value && searchIcon) {
            searchIcon.style.transform = "translateX(-92px)";
          }
        },
      },
      {
        selector: "input[name='chat_search']",
        event: "blur",
        handler: (e) => {
          const searchIcon = this.element.querySelector(
            ".search_icon"
          ) as HTMLImageElement;
          if (!e.target.value && searchIcon) {
            searchIcon.style.transform = "translateX(0)";
          }
        },
      },
      {
        selector: "input[name='chat_search']",
        event: "focus",
        handler: (e) => {
          const searchIcon = this.element.querySelector(
            ".search_icon"
          ) as HTMLImageElement;
          if (!e.target.value && searchIcon) {
            searchIcon.style.transform = "translateX(-92px)";
          }
        },
      },
    ];

    // Тут будет приходить массив, надо будет по нему проходить и создавать на его основе компоненты, а в шаблоне перебирать через each, но в данном спринте эта логика не нужна

    // Так же надо будет итерироваться по массиву сообщений

    const ChatItem1 = new ChatItem({
      pfpUrl: "/mock_pfp2.jpg",
      chatName: "Andrew",
      lastData: "image",
      lastTime: "13:37",
    });

    const ChatItem2 = new ChatItem({
      pfpUrl: "/mock_pfp2.jpg",
      chatName: "Andrew",
      lastData: "image",
      lastTime: "13:37",
      youSend: true,
    });

    const ChatItem3 = new ChatItem({
      pfpUrl: "/mock_pfp2.jpg",
      chatName: "Andrew",
      lastData: "image",
      lastTime: "13:37",
      unreadAmount: 55,
    });

    this.registerChild("ChatItem1", ChatItem1);
    this.registerChild("ChatItem2", ChatItem2);
    this.registerChild("ChatItem3", ChatItem3);
  }

  render(): string {
    const context = {};

    Object.entries(this._children).forEach(([name, component]) => {
      console.log(name);
      context[name] = `<div data-component-id="${name}"></div>`;
    });

    return Handlebars.compile(messengerPageTemplate)(context);
  }
}
