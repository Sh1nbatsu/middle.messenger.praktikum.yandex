import Block from "../../../core/Block";
import Handlebars from "handlebars";
import messengerPageTemplate from "./messengerPage.template";

import { ChatTop } from "../../components/chatTop";
import { ChatList } from "../../components/chatList";
import { MessageList } from "../../components/messageList";
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
          if (!(e.target as HTMLInputElement).value && searchIcon) {
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
          if (!(e.target as HTMLInputElement).value && searchIcon) {
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
          if (!(e.target as HTMLInputElement).value && searchIcon) {
            searchIcon.style.transform = "translateX(-92px)";
          }
        },
      },
      {
        selector: "#search-bar",
        event: "submit",
        handler: (e) => {
          e.preventDefault();
          const formData = new FormData(e.target as HTMLFormElement);
          const search = formData.get("chat_search");
          if (!search) {
            console.log("empty");
          } else {
            console.log(search);
          }
        },
      },
      {
        selector: "#send-message",
        event: "submit",
        handler: (e) => {
          event?.preventDefault();
          const formData = new FormData(e.target as HTMLFormElement);
          const message = formData.get("message");
          if (!message) {
            alert("empty");
          } else {
            console.log(message);
          }
        },
      },
    ];

    // Тут будет приходить массив, надо будет по нему проходить и создавать на его основе компоненты, а в шаблоне перебирать через each, но в данном спринте эта логика не нужна

    const chatlist = new ChatList({});

    this.registerChild("ChatList", chatlist);

    const messageList = new MessageList({});

    this.registerChild("MessageList", messageList);

    // По клику на chat item должен уходить запрос на получение списка сообщений, и на основании этого будут отображаться сообщения. Можно это сделать как через прослушиватель событий, пока эту логику трогать не буду, написал ради примера и собственного понимания

    const chatTop = new ChatTop({
      name: "Onryo",
      pfpUrl: "./mock_pfp2.jpg",
    });

    this.registerChild("ChatTop", chatTop);
  }

  render(): string {
    const context: { [key: string]: string | string[] } = {};

    Object.entries(this._children).forEach(([name]) => {
      context[name] = `<div data-component-id="${name}"></div>`;
    });

    console.log(context);

    return Handlebars.compile(messengerPageTemplate)(context);
  }
}
