import Block, { BlockProps } from "../../../core/Block.ts";
import Handlebars from "handlebars";
import userDropdownItem from "../userDropdownItem/userDropdownItem.ts";
import userDropdownPartial from "./userDropdown.partial.ts";

import { connect } from "../../../utils/connect.ts";
import { AddUser } from "../../../domain/chats/chatsController.ts";
import { StoreTypes } from "../../../core/Store.ts";
import coreDomain from "../../../domain/coreDomain.ts";

export class UserDropdown extends Block {
  constructor(props: BlockProps = {}) {
    super("div", {
      ...props,
    });
  }

  init() {
    super.init();
  }

  componentDidUpdate(oldProps: StoreTypes, newProps: StoreTypes) {
    if (oldProps.searchResult !== newProps.searchResult) {
      this.updateUserItems(newProps.searchResult);
      return true;
    } else {
      return false;
    }
  }

  updateUserItems(searchResult: StoreTypes["searchResult"]) {
    const chats = searchResult;
    Object.values(this._children).forEach((child) => child.destroy());
    this._children = {};

    if (chats) {
      chats.forEach((item, index) => {
        let avatar: string;

        if (item.avatar) {
          avatar = `https://${coreDomain}/api/v2/resources${item.avatar}`;
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
                if (divForId.dataset.id) {
                  AddUser({ user: Number(divForId.dataset.id) });
                }
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

    return Handlebars.compile(userDropdownPartial)(context);
  }
}

const mapStateToProps = (state: unknown) => {
  return {
    searchResult: (state as StoreTypes).searchResult,
  };
};

export default connect(mapStateToProps)(UserDropdown);
