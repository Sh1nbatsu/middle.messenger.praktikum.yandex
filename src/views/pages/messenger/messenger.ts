import Block from "../../../core/Block";
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
      {
        selector: "#search-bar",
        event: "submit",
        handler: (e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const search = formData.get("chat_search");
          if (!search) {
            console.log("empty");
          } else {
            console.log(search);
          }
        },
      },
    ];

    // Тут будет приходить массив, надо будет по нему проходить и создавать на его основе компоненты, а в шаблоне перебирать через each, но в данном спринте эта логика не нужна

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

    let count = 0;

    chatItems.forEach((item) => {
      const chatItem = new ChatItem({
        pfpUrl: item.pfpUrl,
        chatName: item.chatName,
        lastData: item.lastData,
        lastTime: item.lastTime,
        youSend: item.youSend,
        unreadAmount: item.unreadAmount,
      });

      this.registerChild(`ChatItem${count}`, chatItem);
      count++;
    });

    // По клику на chat item должен уходить запрос на получение списка сообщений, и на основании этого будут отображаться сообщения. Можно это сделать как через прослушиватель событий, пока эту логику трогать не буду, написал ради примера и собственного понимания
  }

  render(): string {
    const context: { children?: string[] } = {};

    Object.entries(this._children).forEach(([name]) => {
      context[name] = `<div data-component-id="${name}"></div>`;
    });

    const contextEntries = Object.entries(context);

    const childrenList: string[] = [];

    // Оно работает, но я абсолютно не понимаю как это типизировать

    contextEntries.forEach((child: [string, string]) => {
      console.log(child);

      childrenList.push(child[1]);
    });

    context.children = childrenList;

    return Handlebars.compile(messengerPageTemplate)(context);
  }
}
