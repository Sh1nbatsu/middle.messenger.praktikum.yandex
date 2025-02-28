import Block from "../../core/Block";
import loginPageTemplate from "./loginPage.template";
import Handlebars from "handlebars";

import MainButton from "../../components/mainButton/mainButton";
import LoginInput from "../../components/loginInput/loginInput";

export default class Login extends Block {
  constructor(props = {}) {
    super("div", {
      ...props,
    });
  }

  init() {
    super.init();

    const mainButton = new MainButton({
      buttonType: "submit",
      buttonText: "Enter",
      events: {
        input: (e: Event) => {
          console.log("Login input:", (e.target as HTMLInputElement).value);
        },
      },
    });

    const loginInput = new LoginInput({
      inputType: "text",
      inputName: "login",
      inputDesc: "Login",
      errorMessage: "Invalid login",
      events: {
        input: (e: Event) => {
          console.log("Login input:", (e.target as HTMLInputElement).value);
        },
      },
    });

    const passwordInput = new LoginInput({
      inputType: "password",
      inputName: "password",
      inputDesc: "Password",
      errorMessage: "Invalid password",
      events: {
        input: (e: Event) => {
          console.log("Password input:", (e.target as HTMLInputElement).value);
        },
      },
    });

    // Register child components
    this.registerChild("mainButton", mainButton);
    this.registerChild("loginInput", loginInput);
    this.registerChild("passwordInput", passwordInput);
  }

  componentDidMount() {
    console.log("Login component mounted");
  }

  render(): string {
    const context = {};

    Object.entries(this._children).forEach(([name, component]) => {
      context[name] = component.getContent().outerHTML;
    });

    return Handlebars.compile(loginPageTemplate)(context);
  }
}
