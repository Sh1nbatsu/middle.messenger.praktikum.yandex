import Block, { BlockProps } from "../../../core/Block.ts";
import Handlebars from "handlebars";
import chatTopPartial from "./chatTop.partial.ts";
import { CustomEvent } from "../../../core/Block.ts";
import { connect } from "../../../utils/connect.ts";
import { StoreTypes } from "../../../core/Store.ts";
import coreDomain from "../../../domain/coreDomain.ts";

export interface ChatTopProps extends BlockProps {
  name: string;
  pfpUrl: string;
  events?: CustomEvent[];
}

export class ChatTop extends Block {
  constructor(props: ChatTopProps) {
    super("div", {
      ...props,
      events: [
        {
          selector: "#chat-dropdown",
          event: "click",
          handler: (e: Event) => {
            const target = e.target as HTMLElement;
            const closest = target.closest(".chat-option") as HTMLElement;
            const action = closest.id as string;

            const dropdown = document.querySelector(
              "#chat-dropdown"
            ) as HTMLElement;

            const modal = document.querySelector(
              "#chat-create-popup"
            ) as HTMLElement;

            const input = modal.querySelector("input") as HTMLInputElement;
            const button = modal.querySelector("button") as HTMLButtonElement;
            const form = modal.querySelector(
              "#chatoptionform"
            ) as HTMLFormElement;
            form.style.visibility = "visible";

            dropdown.style.opacity = "0";
            dropdown.style.visibility = "hidden";

            modal.style.opacity = "1";
            modal.style.visibility = "visible";

            const editUserDropdown = document.querySelector(
              ".chat-user-dropdown"
            )?.parentElement as HTMLElement;

            form.dataset.action = action;

            switch (action) {
              case "delete_user":
                input.style.display = "none";
                button.style.display = "none";
                editUserDropdown.style.display = "flex";
                editUserDropdown.style.visibility = "visible";
                editUserDropdown.style.opacity = "1";
                break;
              case "delete_chat":
                button.style.display = "block";
                input.style.display = "none";
                button.innerText = "Delete chat";
                editUserDropdown.style.visibility = "hidden";
                editUserDropdown.style.opacity = "0";
                editUserDropdown.style.display = "none";
                break;
            }
          },
        },
      ],
    });
  }

  render(): string {
    const compiledTemplate = Handlebars.compile(chatTopPartial);
    return compiledTemplate(this.props);
  }

  componentDidUpdate(oldProps: StoreTypes, newProps: StoreTypes) {
    if (newProps.currentChat !== oldProps.currentChat) {
      this.setProps({
        name: newProps.currentChat?.title || "",
        pfpUrl: newProps.currentChat
          ? `https://${coreDomain}/api/v2/resources${newProps.currentChat.avatar}`
          : "",
      });
      return true;
    }
    return false;
  }
}

const mapStateToProps = (state: unknown) => {
  return {
    currentChat: (state as StoreTypes).currentChat,
  };
};

export default connect(mapStateToProps)(ChatTop);
