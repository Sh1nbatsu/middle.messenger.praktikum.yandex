import Block, { BlockProps } from "../../../core/Block.ts";
import Handlebars from "handlebars";
import userDropdownItem from "../userDropdownItem/userDropdownItem.ts";
import chatUserDropdownPartial from "./chatUserDropdown.partial.ts";
import { SearchChatUsers } from "../../../domain/chats/chatsController.ts";

import { connect } from "../../../utils/connect.ts";
import { StoreTypes } from "../../../core/Store.ts";

export class ChatUserDropdown extends Block {
  constructor(props?: BlockProps) {
    super("div", {
      ...props,
    });
  }

  init() {
    super.init();

    this.updateUserItems(this.props.currentChat as StoreTypes["currentChat"]);
  }

  componentDidUpdate(oldProps: StoreTypes, newProps: StoreTypes) {
    if (oldProps.currentChat !== newProps.currentChat) {
      this.updateUserItems(newProps.currentChat as StoreTypes["currentChat"]);
      return true;
    } else {
      return false;
    }
  }

  async updateUserItems(currentChat: StoreTypes["currentChat"]) {
    Object.values(this._children).forEach((child) => child.destroy());
    this._children = {};

    if (!currentChat || !currentChat.id) {
      return;
    }

    await SearchChatUsers({ id: currentChat.id });
    const users = window.store.getState().currentChat.chatUsers;

    console.log(users);

    if (users) {
      users.forEach((item: StoreTypes["user"] | null, index: number) => {
        if (!item) return;
        
        let avatar: string;

        if (item.avatar) {
          avatar = `https://ya-praktikum.tech/api/v2/resources${item.avatar}`;
        } else {
          avatar = "./mock_pfp1.jpg";
        }

        const chatItem = new userDropdownItem({
          userPfp: avatar,
          userName: item.login,
          userId: item.id,
          events: [
            {
              selector: "img",
              event: "click",
              handler: () => {
                const divForId = document.querySelector(
                  `.dropdown-item[data-id="${item.id}"]`
                ) as HTMLElement;
                console.log(divForId.dataset.id);
                // AddUser({ user: divForId.dataset.id });
              },
            },
          ],
        });

        this.registerChild(`DropdownItem${index}`, chatItem);
      });
    }

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

    return Handlebars.compile(chatUserDropdownPartial)(context);
  }
}

const mapStateToProps = (state: StoreTypes) => {
  return {
    currentChat: state.currentChat,
  };
};

export default connect(mapStateToProps)(ChatUserDropdown);
