import Block from "../../../core/Block";
import editPasswordTemplate from "./editPassword.template";
import Handlebars from "handlebars";
import { validateAll } from "../../../utils/validation";

import { MainButton } from "../../components/mainButton/";
import { EditInput } from "../../components/editInput";
import { PfpBlock } from "../../components/pfpBlock";

export default class EditPassword extends Block {
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
        selector: "#password-form",
        event: "submit",
        handler: (e) => {
          let isValid = true;

          e.preventDefault();

          const Components = [
            this._children.newPasswordInput.element,
            this._children.confirmPasswordInput.element,
          ];

          // Тут должна быть логика по проверке соответствия oldPassword с актуальным паролем, сохраненным на сервере

          Components.forEach((component) => {
            const input = component.querySelector("input") as HTMLInputElement;

            if (!validateAll(input).isPassed) {
              isValid = false;
              input.className = "error";
              setTimeout(() => {
                input.className = "";
              }, 300);
            }
          });

          if (!isValid) {
            alert("Wrong.");
          } else {
            const formData = new FormData(e.target as HTMLFormElement);

            console.log(formData);
          }
        },
      },
    ];

    const mainButton = new MainButton({
      buttonText: "Submit",
      buttonType: "submit",
    });

    const oldPasswordInput = new EditInput({
      inputDesc: "Old password",
      inputType: "password",
      inputName: "old_password",
      errorMessage: "Invalid password",
      placeholder: "●●●●●●●●●",
      required: true,
    });

    const newPasswordInput = new EditInput({
      inputDesc: "New password",
      inputType: "password",
      inputName: "password",
      errorMessage: "Password is too weak",
      placeholder: "●●●●●●●●●",
      required: true,
      events: [
        {
          selector: 'input[name="password"]',
          event: "blur",
          handler: (_e, componentElement) => {
            const input = componentElement?.querySelector(
              "input"
            ) as HTMLInputElement;

            if (!validateAll(input).isPassed && input.value) {
              input.className = "error";
              setTimeout(() => {
                input.className = "";
              }, 300);
            }
          },
        },
      ],
    });

    const confirmPasswordInput = new EditInput({
      inputDesc: "Confirm password",
      inputType: "password",
      inputName: "confirm_password",
      errorMessage: "Passwords don't match",
      placeholder: "●●●●●●●●●",
      required: true,
      events: [
        {
          selector: 'input[name="confirm_password"]',
          event: "blur",
          handler: (_e, componentElement) => {
            const input = componentElement?.querySelector(
              "input"
            ) as HTMLInputElement;

            console.log("we are here", input, validateAll(input), input.value);

            if (!validateAll(input).isPassed && input.value) {
              input.className = "error";
              setTimeout(() => {
                input.className = "";
              }, 300);
            }
          },
        },
      ],
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

    this.registerChild("pfpBlock", pfpBlock);
    this.registerChild("mainButton", mainButton);
    this.registerChild("oldPasswordInput", oldPasswordInput);
    this.registerChild("newPasswordInput", newPasswordInput);
    this.registerChild("confirmPasswordInput", confirmPasswordInput);
  }

  render(): string {
    const context: Record<string, string> = {};

    Object.entries(this._children).forEach(([name]) => {
      console.log(name);
      context[name] = `<div data-component-id="${name}"></div>`;
    });

    return Handlebars.compile(editPasswordTemplate)(context);
  }
}
