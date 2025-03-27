import Block from "../../../core/Block";
import Handlebars from "handlebars";
import messengerPageTemplate from "./messengerPage.template";

import { UserDropdown } from "../../components/userDropdown";
import { ChatTop } from "../../components/chatTop";
import { ChatList } from "../../components/chatList";
import { MessageList } from "../../components/messageList";
import { CreateChat } from "../../../domain/chats/chatsController";
import { connect } from "../../../utils/connect";
import * as chats from "../../../domain/chats/chatsController";
import { ChatUserDropdown } from "../../components/chatUserDropdown";
import modalPfp from "../../components/modalPfp/modalPfp";
import { wsService } from "../../../services/wsService";
import { StoreTypes } from "../../../core/Store";

export class Messenger extends Block {
  constructor(props = {}) {
    super("div", {
      ...props,
    });
  }

  init() {
    super.init();

    this.props.events = [
      {
        selector: ".chat-pfp",
        event: "click",
        handler: () => {
          const modal = document.querySelector(
            ".pfpmodal-wrapper"
          ) as HTMLElement;

          modal.style.visibility = "visible";
          modal.style.opacity = "1";
        },
      },
      {
        selector: ".chat-avatar-popup",
        event: "click",
        handler: (e: Event) => {
          const target = e.target as HTMLElement;
          const modal = document.querySelector(
            ".pfpmodal-wrapper"
          ) as HTMLElement;

          if (target.closest("div")?.className == "pfpmodal-wrapper") {
            modal.style.visibility = "hidden";
            modal.style.opacity = "0";
          }
        },
      },
      {
        selector: "input[name='chat_search']",
        event: "input",
        handler: (e: InputEvent) => {
          const searchIcon = this.element.querySelector(
            ".search_icon"
          ) as HTMLImageElement;
          if (!(e.target as HTMLInputElement).value && searchIcon) {
            searchIcon.style.transform = "translateX(-92px)";
          }

          const input = e.target as HTMLInputElement;
          const chatList = document.querySelector(
            ".chat-select__wrapper"
          ) as HTMLElement;
          const resultWrapper = document
            .querySelector(".search-result")
            ?.closest("div") as HTMLElement;
          console.log(resultWrapper);

          if (!input.value) {
            chatList.style.visibility = "visible";
            chatList.style.opacity = "1";
            resultWrapper.style.visibility = "hidden";
            resultWrapper.style.opacity = "0";
          }
        },
      },
      {
        selector: "input[name='chat_search']",
        event: "blur",
        handler: (e: Event) => {
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
        handler: (e: FocusEvent) => {
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
        handler: async (e: SubmitEvent) => {
          e.preventDefault();
          const formData = new FormData(e.target as HTMLFormElement);
          const search = formData.get("chat_search");
          const chatList = document.querySelector(
            ".chat-select__wrapper"
          ) as HTMLElement;
          const resultWrapper = document
            .querySelector(".search-result")
            ?.closest("div") as HTMLElement;
          console.log(resultWrapper);

          if (!search) {
            console.log("empty");
          } else {
            await chats.SearchUser({ login: search });
            chatList.style.visibility = "hidden";
            chatList.style.opacity = "0";
            resultWrapper.style.visibility = "visible";
            resultWrapper.style.opacity = "1";
          }
        },
      },
      {
        selector: "#send-message",
        event: "submit",
        handler: (e: SubmitEvent) => {
          e.preventDefault();
          const formData = new FormData(e.target as HTMLFormElement);
          const message = formData.get("message");
          const input = document.querySelector(
            "input[name='message']"
          ) as HTMLInputElement;
          if (!message) {
            alert("empty");
          } else {
            wsService.send(message);
            console.log(input);
            input.value = "";
          }
        },
      },
      {
        selector: ".chat-main",
        event: "click",
        handler: (e: Event, componentElement: HTMLElement) => {
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
            }
          } else if (
            target.id == "options" &&
            chat_dropdown.style.opacity == "1"
          ) {
            chat_dropdown.style.visibility = "hidden";
            chat_dropdown.style.opacity = "0";
          } else {
            chat_dropdown.style.visibility = "inherit";
            chat_dropdown.style.opacity = "1";
          }
        },
      },
      {
        selector: ".profile-link",
        event: "click",
        handler: (e: Event) => {
          const target = e.target as HTMLElement;

          if (target) {
            const targetDiv = target.closest("div") as HTMLElement;
            if (targetDiv.id == "chat_create") {
              const popup = document.querySelector(
                "#chat_create_popup"
              ) as HTMLElement;
              popup.style.opacity = "1";
              popup.style.visibility = "inherit";
            }
          }
        },
      },
      {
        selector: "#chat_create_popup",
        event: "click",
        handler: (e: Event, componentElement: HTMLElement) => {
          const target = e.target as HTMLElement;
          const targetDiv = target.closest("*") as HTMLElement;
          console.log(targetDiv);
          if (targetDiv?.id == "chat_create_popup") {
            console.log("Close", componentElement);
            const popup = document.querySelector(
              "#chat_create_popup"
            ) as HTMLElement;
            popup.style.opacity = "0";
            popup.style.visibility = "hidden";
          }
        },
      },
      {
        selector: "#chat_create_form",
        event: "submit",
        handler: (e: SubmitEvent) => {
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
            CreateChat(data as { title: FormDataEntryValue });
            popup.style.opacity = "0";
            popup.style.visibility = "hidden";
          }
        },
      },
      {
        selector: "#chat-option_popup",
        event: "click",
        handler: (e: Event) => {
          const target = e.target as HTMLElement;
          if (target.id == "chat-option_popup") {
            target.style.opacity = "0";
            target.style.visibility = "hidden";
          }
        },
      },
      {
        selector: "#chatoptionform",
        event: "submit",
        handler: (e: Event) => {
          e.preventDefault();
          const target = e.target as HTMLFormElement;
          const formData = new FormData(target);
          const action = target.dataset.action;
          const modal = document.getElementById(
            "chat-option_popup"
          ) as HTMLElement;
          if (
            (formData.get("user") && action != "delete_chat") ||
            action == "delete_chat"
          ) {
            switch (action) {
              case "delete_chat":
                console.log("Deleting chat");
                chats.DeleteChat();
                modal.style.visibility = "hidden";
                modal.style.opacity = "0";
                break;
            }
          } else {
            alert("No user");
          }
        },
      },
    ];

    const chatlist = new ChatList();

    this.registerChild("ChatList", chatlist);

    const messageList = new MessageList();

    this.registerChild("MessageList", messageList);

    const userDropdown = new UserDropdown();

    this.registerChild("UserDropdown", userDropdown);

    const chatUserDropdown = new ChatUserDropdown();

    this.registerChild("ChatUserDropdown", chatUserDropdown);

    let chatTop;

    if (window.store.getState().currentChat) {
      chatTop = new ChatTop({
        name: window.store.getState().currentChat.title,
        pfpUrl: `https://ya-praktikum.tech/api/v2/resources${
          window.store.getState().currentChat.avatar
        }`,
      });
    } else {
      chatTop = new ChatTop({
        name: "",
        pfpUrl: "",
      });
    }

    this.registerChild("ChatTop", chatTop);

    const ChatPfp = new modalPfp({
      isLoading: false,
      events: [
        {
          selector: "form",
          event: "submit",
          handler: (e, componentElement) => {
            e.preventDefault();
            const formData = new FormData();
            const fileInput = componentElement.querySelector(
              "input[type=file]"
            ) as HTMLInputElement;
            if (fileInput) {
              const files = fileInput.files as FileList;
              console.log(formData, files);
              if (files?.length > 1) {
                alert("More than one image loaded, abort");
                return;
              } else if (files?.length === 1) {
                chats.UpdateChatAvatar({ avatar: files[0] });
                const modal = document.querySelector(
                  ".pfpmodal-wrapper"
                ) as HTMLElement;

                modal.style.visibility = "hidden";
                modal.style.opacity = "0";
              }
            }
          },
        },
      ],
    });

    this.registerChild("chatPfp", ChatPfp);
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

const mapStateToProps = (state: StoreTypes) => {
  return {
    chats: state.chats,
    currentChat: state.currentChat,
  };
};

export default connect(mapStateToProps)(Messenger);
