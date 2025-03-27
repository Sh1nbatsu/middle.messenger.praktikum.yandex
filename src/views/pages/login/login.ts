import Block from "../../../core/Block";
import loginPageTemplate from "./loginPage.template";
import Handlebars from "handlebars";
import { validateLogin } from "../../../services/validation";

import { MainButton } from "../../components/mainButton/";
import { LoginInput } from "../../components/loginInput/";
import { connect } from "../../../utils/connect";
import { loginService } from "../../../domain/auth/authController";
import { StoreTypes } from "../../../core/Store";

export class Login extends Block {
  constructor(props = {}) {
    super("div", {
      ...props,
    });
  }

  init() {
    super.init();

    this.props.events = [
      {
        selector: "#login-form",
        event: "submit",
        handler: (e: SubmitEvent) => {
          e.preventDefault();
          const inputs = this.element.querySelectorAll("input");
          if (!validateLogin(inputs[0].value) || !inputs[1].value) {
            alert("Invalid data");
            return;
          } else {
            const formData = new FormData(e.target as HTMLFormElement);
            const data = {
              login: formData.get("login") as string,
              password: formData.get("password") as string,
            };
            loginService(data);
          }
        },
      },
    ];

    const mainButton = new MainButton({
      buttonType: "submit",
      buttonText: "Enter",
      isLoading: (this.props.isLoading as boolean) || false,
    });

    const loginInput = new LoginInput({
      inputType: "text",
      inputName: "login",
      inputDesc: "Login",
      errorMessage: "Invalid login",
      events: [
        {
          selector: 'input[name="login"]',
          event: "input",
          handler: (e, componentElement) => {
            const topText = componentElement?.querySelector(
              ".top__text"
            ) as HTMLElement;
            if (topText) {
              topText.style.transform = "translate(-8%, 0) scale(0.8)";
            }

            const target = e.target as HTMLInputElement;

            if (!target.value) {
              topText.style.transform = "translateY(20px)";
            }
          },
        },
        {
          selector: 'input[name="login"]',
          event: "blur",
          handler: (e, componentElement) => {
            const bottomText = componentElement.querySelector(
              `.bottom__text`
            ) as HTMLElement;

            const target = e.target as HTMLInputElement;

            if (target.value) {
              if (!validateLogin(target.value)) {
                bottomText.style.opacity = "1";
                bottomText.style.transform = "translateY(0)";
              }

              setTimeout(() => {
                bottomText.style.opacity = "0";
                bottomText.style.transform = "translateY(-18px)";
              }, 2000);
            }
          },
        },
      ],
    } as const);

    const passwordInput = new LoginInput({
      inputType: "password",
      inputName: "password",
      inputDesc: "Password",
      errorMessage: "Invalid password",
      events: [
        {
          selector: 'input[name="password"]',
          event: "input",
          handler: (e, componentElement) => {
            const topText = componentElement.querySelector(
              ".top__text"
            ) as HTMLElement;
            topText.style.transform = "translate(-8%, 0) scale(0.8)";
            if (!(e.target as HTMLInputElement).value) {
              topText.style.transform = "translateY(20px)";
            }
          },
        },
      ],
    });

    this.registerChild("mainButton", mainButton);
    this.registerChild("loginInput", loginInput);
    this.registerChild("passwordInput", passwordInput);
  }

  componentDidMount() {
    console.log("Login component mounted");
  }

  render(): string {
    const context: Record<string, string> = {};

    Object.entries(this._children).forEach(([name]) => {
      console.log(name);
      context[name] = `<div data-component-id="${name}"></div>`;
    });

    context.loginError = this.props.loginError as string;

    console.log("Context and props", context, this.props.loginError);

    return Handlebars.compile(loginPageTemplate)(context);
  }
}

const mapStateToProps = (state: unknown) => {
  return {
    isLoading: (state as StoreTypes).isLoading,
    loginError: (state as StoreTypes).loginError,
  };
};

export default connect(mapStateToProps)(Login);

// Где то под самый конец процесса навешивания типов и фикса ошибок я понял что можно state вынести в отдельный интерфейс, где будет описано все...
