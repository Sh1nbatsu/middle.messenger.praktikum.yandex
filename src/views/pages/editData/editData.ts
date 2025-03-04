import Block from "../../../core/Block";
import editDataTemplate from "./editData.template";
import Handlebars from "handlebars";
import { validateAll } from "../../../utils/validation";

import { MainButton } from "../../components/mainButton/";
import { EditInput } from "../../components/editInput";
import { PfpBlock } from "../../components/pfpBlock";

// Вынести смену аватарки в отдельный компонент

export default class EditData extends Block {
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
        selector: "#edit-form",
        event: "submit",
        handler: (e) => {
          let isValid = true;
          let isEmpty = true;

          e.preventDefault();

          const Components = [
            this._children.emailInput.element,
            this._children.loginInput.element,
            this._children.firstNameInput.element,
            this._children.secondNameInput.element,
            this._children.displayNameInput.element,
            this._children.phoneNumberInput.element,
          ];

          Components.forEach((component) => {
            const input = component.querySelector("input") as HTMLInputElement;
            console.log(input.value);
            if (input) {
              if (input.value && !validateAll(input).isPassed) {
                isValid = false;
              } else if (input.value) {
                isEmpty = false;
              }
            }
          });

          const formData = new FormData(e.target);

          if (isValid && !isEmpty) {
            const formValues: Record<string, string> = {};

            formData.forEach((value, key) => {
              if (value) {
                formValues[key] = value as string;
              }
            });

            console.log(formValues);
          } else if (isValid && isEmpty) {
            alert("Заполните хотя бы одно поле");
          }
        },
      },
    ];

    const emailInput = new EditInput({
      inputDesc: "Email",
      inputType: "email",
      inputName: "email",
      errorMessage: "Invalid email",
      placeholder: "mymail@mail.com",
      events: [
        {
          selector: 'input[name="email"]',
          event: "blur",
          handler: (e, componentElement) => {
            const input = componentElement?.querySelector(
              "input"
            ) as HTMLInputElement;

            if (!validateAll(input).isPassed && input.value) {
              input.className = "error";
              input.style.color = "red";
              setTimeout(() => {
                input.className = "";
              }, 300);
            }
          },
        },
        {
          selector: 'input[name="email"]',
          event: "input",
          handler: (e, componentElement) => {
            const input = componentElement?.querySelector(
              "input"
            ) as HTMLInputElement;

            input.style.color = "inherit";
          },
        },
      ],
    });

    const loginInput = new EditInput({
      inputDesc: "Login",
      inputType: "text",
      inputName: "login",
      errorMessage: "Invalid login",
      placeholder: "John Doe",
      events: [
        {
          selector: 'input[name="login"]',
          event: "blur",
          handler: (e, componentElement) => {
            const input = componentElement?.querySelector(
              "input"
            ) as HTMLInputElement;

            if (!validateAll(input).isPassed && input.value) {
              input.className = "error";
              input.style.color = "red";
              setTimeout(() => {
                input.className = "";
              }, 300);
            }
          },
        },
        {
          selector: 'input[name="login"]',
          event: "input",
          handler: (e, componentElement) => {
            const input = componentElement?.querySelector(
              "input"
            ) as HTMLInputElement;

            input.style.color = "inherit";
          },
        },
      ],
    });

    const firstNameInput = new EditInput({
      inputDesc: "First name",
      inputType: "text",
      inputName: "first_name",
      errorMessage: "Invalid first name",
      placeholder: "John",
      events: [
        {
          selector: 'input[name="first_name"]',
          event: "blur",
          handler: (e, componentElement) => {
            const input = componentElement?.querySelector(
              "input"
            ) as HTMLInputElement;

            if (!validateAll(input).isPassed && input.value) {
              input.className = "error";
              input.style.color = "red";
              setTimeout(() => {
                input.className = "";
              }, 300);
            }
          },
        },
        {
          selector: 'input[name="first_name"]',
          event: "input",
          handler: (e, componentElement) => {
            const input = componentElement?.querySelector(
              "input"
            ) as HTMLInputElement;

            input.style.color = "inherit";
          },
        },
      ],
    });

    const secondNameInput = new EditInput({
      inputDesc: "Second name",
      inputType: "text",
      inputName: "second_name",
      errorMessage: "Invalid second name",
      placeholder: "Doe",
      events: [
        {
          selector: 'input[name="second_name"]',
          event: "blur",
          handler: (e, componentElement) => {
            const input = componentElement?.querySelector(
              "input"
            ) as HTMLInputElement;

            console.log(input);

            if (!validateAll(input).isPassed && input.value) {
              input.className = "error";
              input.style.color = "red";
              setTimeout(() => {
                input.className = "";
              }, 300);
            }
          },
        },
        {
          selector: 'input[name="second_name"]',
          event: "input",
          handler: (e, componentElement) => {
            const input = componentElement?.querySelector(
              "input"
            ) as HTMLInputElement;

            input.style.color = "inherit";
          },
        },
      ],
    });

    const displayNameInput = new EditInput({
      inputDesc: "Name in chat",
      inputType: "text",
      inputName: "display_name",
      errorMessage: "Invalid name",
      placeholder: "Will, i guess",
      events: [
        {
          selector: 'input[name="display_name"]',
          event: "blur",
          handler: (e, componentElement) => {
            const input = componentElement?.querySelector(
              "input"
            ) as HTMLInputElement;

            console.log(input);

            if (!validateAll(input).isPassed && input.value) {
              input.className = "error";
              input.style.color = "red";
              setTimeout(() => {
                input.className = "";
              }, 300);
            }
          },
        },
        {
          selector: 'input[name="display_name"]',
          event: "input",
          handler: (e, componentElement) => {
            const input = componentElement?.querySelector(
              "input"
            ) as HTMLInputElement;

            input.style.color = "inherit";
          },
        },
      ],
    });

    const phoneNumberInput = new EditInput({
      inputDesc: "Phone number",
      inputType: "tel",
      inputName: "phone",
      errorMessage: "Invalid phone number",
      placeholder: "8-800-555-35-35",
      events: [
        {
          selector: 'input[name="phone"]',
          event: "blur",
          handler: (e, componentElement) => {
            const input = componentElement?.querySelector(
              "input"
            ) as HTMLInputElement;

            console.log(input);

            if (!validateAll(input).isPassed && input.value) {
              input.className = "error";
              input.style.color = "red";
              setTimeout(() => {
                input.className = "";
              }, 300);
            }
          },
        },
        {
          selector: 'input[name="phone"]',
          event: "input",
          handler: (e, componentElement) => {
            const input = componentElement?.querySelector(
              "input"
            ) as HTMLInputElement;

            input.style.color = "inherit";
          },
        },
      ],
    });

    const mainButton = new MainButton({
      buttonType: "submit",
      buttonText: "Sumbit",
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
    this.registerChild("emailInput", emailInput);
    this.registerChild("loginInput", loginInput);
    this.registerChild("firstNameInput", firstNameInput);
    this.registerChild("secondNameInput", secondNameInput);
    this.registerChild("displayNameInput", displayNameInput);
    this.registerChild("phoneNumberInput", phoneNumberInput);
    this.registerChild("mainButton", mainButton);
  }

  render(): string {
    const context = {};

    Object.entries(this._children).forEach(([name, component]) => {
      console.log(name);
      context[name] = `<div data-component-id="${name}"></div>`;
    });

    return Handlebars.compile(editDataTemplate)(context);
  }
}
