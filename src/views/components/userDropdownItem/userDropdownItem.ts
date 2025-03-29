import Block from "../../../core/Block.ts";
import Handlebars from "handlebars";
import userDropdownItemPartial from "./userDropdownItem.partial.ts";
import { CustomEvent } from "../../../core/Block.ts";
import { StoreTypes } from "../../../core/Store.ts";

export interface userDropdownItemProps {
  userPfp: string | null;
  userName: string;
  userId: number;
  events?: CustomEvent[];
}

export default class userDropdownItem extends Block {
  constructor(props: userDropdownItemProps) {
    super("div", {
      ...props,
    });
  }

  componentDidUpdate(oldProps: StoreTypes, newProps: StoreTypes) {
    if (oldProps.searchResult !== newProps.searchResult) {
      return true;
    } else {
      return false;
    }
  }

  render(): string {
    const compiledTemplate = Handlebars.compile(userDropdownItemPartial);
    return compiledTemplate(this.props);
  }
}
