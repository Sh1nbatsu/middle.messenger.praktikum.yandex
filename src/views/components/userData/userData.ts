import Block from "../../../core/Block.ts";
import Handlebars from "handlebars";
import userDataPartial from "./userData.partial.ts";

export interface UserDataProps {
  desc: string;
  data: string;
}

export default class UserData extends Block {
  constructor(props: UserDataProps) {
    super("div", props);
  }

  render(): string {
    const compiledTemplate = Handlebars.compile(userDataPartial);
    return compiledTemplate(this.props);
  }
}
