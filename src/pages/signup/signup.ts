import Block from "../../core/Block";
import signinPageTemplate from "./signinPage.template";
import Handlebars from "handlebars";
import { validateAll } from "../../utils/validation";

import { MainButton } from "../../components/mainButton/";
import { LoginInput } from "../../components/loginInput/";

export default class SignUp extends Block {
  constructor(props = {}) {
    super("div", {
      ...props,
    });
  }

  init() {
    super.init();

    this.props.events = [
      ...(this.props.events || []),
      {
        selector: "#register-form",
        event: "submit",
        handler: (e) => {
          let isValid = true;
          e.preventDefault();

          const Components = [
            this._children.emailInput.element,
            this._children.loginInput.element,
            this._children.firstNameInput.element,
            this._children.secondNameInput.element,
            this._children.phoneInput.element,
            this._children.passwordInput.element,
            this._children.confirmPasswordInput.element,
          ];

          Components.forEach((component) => {
            const input = component.querySelector("input") as HTMLInputElement;
            const bottomText = component.querySelector(
              ".bottom__text"
            ) as HTMLElement;
            console.log(input, bottomText);

            if (input && bottomText) {
              if (!validateAll(input).isPassed) {
                bottomText.style.opacity = "1";
                bottomText.style.transform = "translateY(0)";
                setTimeout(() => {
                  bottomText.style.opacity = "0";
                  bottomText.style.transform = "translateY(-18px)";
                }, 2000);
                isValid = false;
              }
            }
          });

          console.log(isValid);

          if (isValid) {
            const formData = new FormData(e.target);
            const login = formData.get("login");
            const password = formData.get("password");
            console.log("Login:", login, "Password:", password);
          } else {
            console.log("Form is not valid");
          }
        },
      },
    ];

    const mainButton = new MainButton({
      buttonType: "submit",
      buttonText: "Sign up",
    });

    const emailInput = new LoginInput({
      inputType: "email",
      inputDesc: "Email",
      inputName: "email",
      errorMessage: "Invalid email",
      events: [
        {
          selector: 'input[name="email"]',
          event: "input",
          handler: (e, componentElement) => {
            const topText = componentElement.querySelector(".top__text");
            topText.style.transform = "translate(-8%, 0) scale(0.8)";
            if (!e.target.value) {
              topText.style.transform = "translateY(20px)";
            }
          },
        },
        {
          selector: 'input[name="email"]',
          event: "blur",
          handler: (e, componentElement) => {
            const input = componentElement.querySelector("input");
            const bottomText = componentElement.querySelector(".bottom__text");
            if (!validateAll(input).isPassed && input.value) {
              bottomText.style.opacity = "1";
              bottomText.style.transform = "translateY(0)";
              setTimeout(() => {
                bottomText.style.opacity = "0";
                bottomText.style.transform = "translateY(-18px)";
              }, 2000);
              // Пришлось адаптировать логику от старых файлов, в когда я разрабатывал валидацию, оно работает, в принципе так же как и до этого, только несколько костыльно.
            }
          },
        },
        {
          selector: 'input[name="email"]',
          event: "focus",
          handler: (e, componentElement) => {
            const bottomText = componentElement.querySelector(".bottom__text");
            bottomText.style.opacity = "0";
            bottomText.style.transform = "translateY(-18px)";
          },
        },
      ],
    });

    const loginInput = new LoginInput({
      inputType: "text",
      inputDesc: "Login",
      inputName: "login",
      errorMessage: "Invalid login",
      events: [
        {
          selector: 'input[name="login"]',
          event: "input",
          handler: (e, componentElement) => {
            const topText = componentElement.querySelector(".top__text");
            topText.style.transform = "translate(-8%, 0) scale(0.8)";
            if (!e.target.value) {
              topText.style.transform = "translateY(20px)";
            }
          },
        },
        {
          selector: 'input[name="login"]',
          event: "blur",
          handler: (e, componentElement) => {
            const input = componentElement.querySelector("input");
            const bottomText = componentElement.querySelector(".bottom__text");
            if (!validateAll(input).isPassed && input.value) {
              bottomText.style.opacity = "1";
              bottomText.style.transform = "translateY(0)";
              setTimeout(() => {
                bottomText.style.opacity = "0";
                bottomText.style.transform = "translateY(-18px)";
              }, 2000);
            }
          },
        },
        {
          selector: 'input[name="login"]',
          event: "focus",
          handler: (e, componentElement) => {
            const bottomText = componentElement.querySelector(".bottom__text");
            bottomText.style.opacity = "0";
            bottomText.style.transform = "translateY(-18px)";
          },
        },
      ],
    });

    const firstNameInput = new LoginInput({
      inputType: "text",
      inputDesc: "First name",
      inputName: "first_name",
      errorMessage: "Invalid first name",
      events: [
        {
          selector: 'input[name="first_name"]',
          event: "input",
          handler: (e, componentElement) => {
            const topText = componentElement.querySelector(".top__text");
            topText.style.transform = "translate(-8%, 0) scale(0.8)";
            if (!e.target.value) {
              topText.style.transform = "translateY(20px)";
            }
          },
        },
        {
          selector: 'input[name="first_name"]',
          event: "blur",
          handler: (e, componentElement) => {
            const input = componentElement.querySelector("input");
            const bottomText = componentElement.querySelector(".bottom__text");
            if (!validateAll(input).isPassed && input.value) {
              bottomText.style.opacity = "1";
              bottomText.style.transform = "translateY(0)";
              setTimeout(() => {
                bottomText.style.opacity = "0";
                bottomText.style.transform = "translateY(-18px)";
              }, 2000);
            }
          },
        },
        {
          selector: 'input[name="first_name"]',
          event: "focus",
          handler: (e, componentElement) => {
            const bottomText = componentElement.querySelector(".bottom__text");
            bottomText.style.opacity = "0";
            bottomText.style.transform = "translateY(-18px)";
          },
        },
      ],
    });

    const secondNameInput = new LoginInput({
      inputType: "text",
      inputDesc: "Second name",
      inputName: "second_name",
      errorMessage: "Invalid second name",
      events: [
        {
          selector: 'input[name="second_name"]',
          event: "input",
          handler: (e, componentElement) => {
            const topText = componentElement.querySelector(".top__text");
            topText.style.transform = "translate(-8%, 0) scale(0.8)";
            if (!e.target.value) {
              topText.style.transform = "translateY(20px)";
            }
          },
        },
        {
          selector: 'input[name="second_name"]',
          event: "blur",
          handler: (e, componentElement) => {
            const input = componentElement.querySelector("input");
            const bottomText = componentElement.querySelector(".bottom__text");
            if (!validateAll(input).isPassed  && input.value) {
              bottomText.style.opacity = "1";
              bottomText.style.transform = "translateY(0)";
              setTimeout(() => {
                bottomText.style.opacity = "0";
                bottomText.style.transform = "translateY(-18px)";
              }, 2000);
            }
          },
        },
        {
          selector: 'input[name="second_name"]',
          event: "focus",
          handler: (e, componentElement) => {
            const bottomText = componentElement.querySelector(".bottom__text");
            bottomText.style.opacity = "0";
            bottomText.style.transform = "translateY(-18px)";
          },
        },
      ],
    });

    const phoneInput = new LoginInput({
      inputType: "phone",
      inputDesc: "Phone number",
      inputName: "phone",
      errorMessage: "Invalid phone number",
      events: [
        {
          selector: 'input[name="phone"]',
          event: "input",
          handler: (e, componentElement) => {
            const topText = componentElement.querySelector(".top__text");
            topText.style.transform = "translate(-8%, 0) scale(0.8)";
            if (!e.target.value) {
              topText.style.transform = "translateY(20px)";
            }
          },
        },
        {
          selector: 'input[name="phone"]',
          event: "blur",
          handler: (e, componentElement) => {
            const input = componentElement.querySelector("input");
            const bottomText = componentElement.querySelector(".bottom__text");
            if (!validateAll(input).isPassed  && input.value) {
              bottomText.style.opacity = "1";
              bottomText.style.transform = "translateY(0)";
              setTimeout(() => {
                bottomText.style.opacity = "0";
                bottomText.style.transform = "translateY(-18px)";
              }, 2000);
            }
          },
        },
        {
          selector: 'input[name="phone"]',
          event: "focus",
          handler: (e, componentElement) => {
            const bottomText = componentElement.querySelector(".bottom__text");
            bottomText.style.opacity = "0";
            bottomText.style.transform = "translateY(-18px)";
          },
        },
      ],
    });

    const passwordInput = new LoginInput({
      inputType: "password",
      inputDesc: "Password",
      inputName: "password",
      errorMessage: "Password is too weak",
      events: [
        {
          selector: 'input[name="password"]',
          event: "input",
          handler: (e, componentElement) => {
            const topText = componentElement.querySelector(".top__text");
            topText.style.transform = "translate(-8%, 0) scale(0.8)";
            if (!e.target.value) {
              topText.style.transform = "translateY(20px)";
            }
          },
        },
        {
          selector: 'input[name="password"]',
          event: "blur",
          handler: (e, componentElement) => {
            const input = componentElement.querySelector("input");
            const bottomText = componentElement.querySelector(".bottom__text");
            if (!validateAll(input).isPassed  && input.value) {
              bottomText.style.opacity = "1";
              bottomText.style.transform = "translateY(0)";
              setTimeout(() => {
                bottomText.style.opacity = "0";
                bottomText.style.transform = "translateY(-18px)";
              }, 2000);
            }
          },
        },
        {
          selector: 'input[name="password"]',
          event: "focus",
          handler: (e, componentElement) => {
            const bottomText = componentElement.querySelector(".bottom__text");
            bottomText.style.opacity = "0";
            bottomText.style.transform = "translateY(-18px)";
          },
        },
      ],
    });

    const confirmPasswordInput = new LoginInput({
      inputType: "password",
      inputDesc: "Confirm password",
      inputName: "confirm_password",
      errorMessage: "Passwords dont match",
      events: [
        {
          selector: 'input[name="confirm_password"]',
          event: "input",
          handler: (e, componentElement) => {
            const topText = componentElement.querySelector(".top__text");
            topText.style.transform = "translate(-8%, 0) scale(0.8)";
            if (!e.target.value) {
              topText.style.transform = "translateY(20px)";
            }
          },
        },
        {
          selector: 'input[name="confirm_password"]',
          event: "blur",
          handler: (e, componentElement) => {
            const input = componentElement.querySelector("input");
            const bottomText = componentElement.querySelector(".bottom__text");
            if (!validateAll(input).isPassed && input.value) {
              bottomText.style.opacity = "1";
              bottomText.style.transform = "translateY(0)";
              setTimeout(() => {
                bottomText.style.opacity = "0";
                bottomText.style.transform = "translateY(-18px)";
              }, 2000);
            }
          },
        },
        {
          selector: 'input[name="confirm_password"]',
          event: "focus",
          handler: (e, componentElement) => {
            const bottomText = componentElement.querySelector(".bottom__text");
            bottomText.style.opacity = "0";
            bottomText.style.transform = "translateY(-18px)";
          },
        },
      ],
    });

    this.registerChild("mainButton", mainButton);
    this.registerChild("emailInput", emailInput);
    this.registerChild("loginInput", loginInput);
    this.registerChild("firstNameInput", firstNameInput);
    this.registerChild("secondNameInput", secondNameInput);
    this.registerChild("phoneInput", phoneInput);
    this.registerChild("passwordInput", passwordInput);
    this.registerChild("confirmPasswordInput", confirmPasswordInput);
  }

  render(): string {
    const context = {};

    Object.entries(this._children).forEach(([name, component]) => {
      console.log(component);
      context[name] = `<div data-component-id="${name}"></div>`;
    });

    return Handlebars.compile(signinPageTemplate)(context);
  }
}
