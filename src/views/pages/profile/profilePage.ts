import Block from "../../../core/Block";
import profilePageTemplate from "./profilePage.template";
import Handlebars from "handlebars";

import { UserData } from "../../components/userData";
import { PfpBlock } from "../../components/pfpBlock";
import { connect } from "../../../utils/connect";
import { modalPfp } from "../../components/modalPfp";
import { getUserController } from "../../../domain/auth/controller";

export class ProfilePage extends Block {
  constructor(props = {}) {
    super("div", {
      ...props,
    });
  }

  init() {
    super.init();

    const userEmail = new UserData({
      desc: "Email",
      data: `${window.store.getState().user.email}`,
    });

    const userLogin = new UserData({
      desc: "Login",
      data: `${window.store.getState().user.login}`,
    });

    const userFirstName = new UserData({
      desc: "First Name",
      data: `${window.store.getState().user.first_name}`,
    });

    const userSecondName = new UserData({
      desc: "Second Name",
      data: `${window.store.getState().user.second_name}`,
    });

    const userDisplayName = new UserData({
      desc: "Name in chat",
      data: `${window.store.getState().user.display_name ?? "Not set"}`,
    });

    const userPhone = new UserData({
      desc: "Phone number",
      data: `${window.store.getState().user.phone}`,
    });

    const pfpBlock = new PfpBlock({
      pfpUrl: "./mock_pfp1.jpg",
      username: "John",
      events: [
        {
          selector: "p",
          event: "click",
          handler: (e) => {
            console.log(e);
          },
        },
      ],
    });

    const ModalPfp = new modalPfp({});

    this.registerChild("pfpBlock", pfpBlock);
    this.registerChild("userEmail", userEmail);
    this.registerChild("userLogin", userLogin);
    this.registerChild("userFirstName", userFirstName);
    this.registerChild("userSecondName", userSecondName);
    this.registerChild("userDisplayName", userDisplayName);
    this.registerChild("userPhone", userPhone);
    this.registerChild("modalPfp", ModalPfp);
  }

  render(): string {
    const context: { [key: string]: string } = {};

    Object.entries(this._children).forEach(([name]) => {
      console.log(name);
      context[name] = `<div data-component-id="${name}"></div>`;
    });

    return Handlebars.compile(profilePageTemplate)(context);
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(ProfilePage);
