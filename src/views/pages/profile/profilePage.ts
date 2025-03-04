import Block from "../../../core/Block";
import profilePageTemplate from "./profilePage.template";
import Handlebars from "handlebars";

import { UserData } from "../../components/userData";
import { PfpBlock } from "../../components/pfpBlock";

export default class ProfilePage extends Block {
  constructor(props = {}) {
    super("div", {
      ...props,
    });
  }

  init() {
    super.init();

    const userEmail = new UserData({
      desc: "Email",
      data: "mymail@mail.com",
    });

    const userLogin = new UserData({
      desc: "Login",
      data: "JohnDoey",
    });

    const userFirstName = new UserData({
      desc: "First Name",
      data: "John",
    });

    const userSecondName = new UserData({
      desc: "Second Name",
      data: "Doe",
    });

    const userDisplayName = new UserData({
      desc: "Name in chat",
      data: "while(true}",
    });

    const userPhone = new UserData({
      desc: "Phone number",
      data: "8-800-555-35-35",
    });

    const pfpBlock = new PfpBlock({
      pfpUrl: "./public/mock_pfp1.jpg",
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

    this.registerChild("pfpBlock", pfpBlock);
    this.registerChild("userEmail", userEmail);
    this.registerChild("userLogin", userLogin);
    this.registerChild("userFirstName", userFirstName);
    this.registerChild("userSecondName", userSecondName);
    this.registerChild("userDisplayName", userDisplayName);
    this.registerChild("userPhone", userPhone);
    
  }

  render(): string {
    const context = {};

    Object.entries(this._children).forEach(([name, component]) => {
      console.log(name);
      context[name] = `<div data-component-id="${name}"></div>`;
    });

    return Handlebars.compile(profilePageTemplate)(context);
  }
}
