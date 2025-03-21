import Block from "../../../core/Block";
import Handlebars from "handlebars";
import messengerPageTemplate from "./messengerPage.template";

import { ChatTop } from "../../components/chatTop";
import { ChatList } from "../../components/chatList";
import { MessageList } from "../../components/messageList";
import { CreateChat } from "../../../domain/chats/chatsController";
import { connect } from "../../../utils/connect";
export class Messenger extends Block {
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
          e.preventDefault();
          const formData = new FormData(e.target as HTMLFormElement);
          const message = formData.get("message");
          if (!message) {
            alert("empty");
          } else {
            console.log(message);
          }
        },
      },
      {
        selector: ".chat-main",
        event: "click",
        handler: (e, componentElement) => {
          const chat_dropdown = componentElement.querySelector(
            "#chat-dropdown"
          ) as HTMLElement;
          console.log(e.target);
          const target = e.target as HTMLElement;
          const targetDiv = target.closest("div") as HTMLElement;
          console.log(target.id, targetDiv.className);
          if (target.id !== "options") {
            if (targetDiv.className !== "chat-option") {
              chat_dropdown.style.visibility = "hidden";
              chat_dropdown.style.opacity = "0";
            } else {
              console.log(targetDiv.id);
            }
          } else {
            chat_dropdown.style.visibility = "inherit";
            chat_dropdown.style.opacity = "1";
          }
        },
      },
      {
        selector: ".profile-link",
        event: "click",
        handler: (e) => {
          const target = e.target as HTMLElement;

          if (target) {
            const targetDiv = target.closest("div") as HTMLElement;
            if (targetDiv.id == "chat_create") {
              const popup = document.querySelector(
                "#chat_create_popup"
              ) as HTMLElement;
              popup.style.display = "flex";
            }
          }
        },
      },
      {
        selector: "#chat_create_popup",
        event: "click",
        handler: (e, componentElement) => {
          const target = e.target as HTMLElement;
          const targetDiv = target.closest("*") as HTMLElement;
          console.log(targetDiv);
          if (targetDiv?.id == "chat_create_popup") {
            console.log("close", componentElement);
            const popup = document.querySelector(
              "#chat_create_popup"
            ) as HTMLElement;
            popup.style.display = "none";
          }
        },
      },
      {
        selector: "#chat_create_form",
        event: "submit",
        handler: (e) => {
          e.preventDefault();
          const popup = document.querySelector(
            "#chat_create_popup"
          ) as HTMLElement;
          const form = e.target as HTMLFormElement;
          const formData = new FormData(form);
          if (
            !formData.get("title") ||
            (formData.get("title") as string).length > 12
          ) {
            alert("Wrong chat name");
            return;
          } else {
            const data = {
              title: formData.get("title"),
            };
            CreateChat(data);
            popup.style.display = "none";
          }
        },
      },
    ];

    const chatlist = new ChatList();

    this.registerChild("ChatList", chatlist);

    const messageList = new MessageList();

    this.registerChild("MessageList", messageList);

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

const mapStateToProps = (state) => {
  return {
    chats: state.chats,
  };
};

export default connect(mapStateToProps)(Messenger);
