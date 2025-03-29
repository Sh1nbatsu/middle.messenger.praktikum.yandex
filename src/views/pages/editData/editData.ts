import Block from "../../../core/Block";
import editDataTemplate from "./editData.template";
import Handlebars from "handlebars";
import { validateAll } from "../../../services/validation";

import { MainButton } from "../../components/mainButton/";
import { EditInput } from "../../components/editInput";
import { PfpBlock } from "../../components/pfpBlock";
import { connect } from "../../../utils/connect";
import {
  updateData,
  updatePfp,
} from "../../../domain/profile/profileController";
import { StoreTypes } from "../../../core/Store";
import coreDomain from "../../../domain/coreDomain";
import { ModalPfp } from "../../components/modalPfp";

export class EditData extends Block {
  constructor(props = {}) {
    super("div", {
      ...props,
    });
  }

  init() {
    super.init();

    this.props.events = [
      {
        selector: "#edit-form",
        event: "submit",
        handler: (e: SubmitEvent) => {
          let isValid = true;
          let isEmpty = true;

          (e as SubmitEvent).preventDefault();

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
            if (input) {
              if (input.value && !validateAll(input).isPassed) {
                isValid = false;
                console.log(input, isValid)
              } else if (input.value) {
                isEmpty = false;
              }
            }
          });

          const formData = new FormData(e.target as HTMLFormElement);

          console.log(isValid, isEmpty)

          if (isValid && !isEmpty) {
            console.log("here");
            const data = {
              email: formData.get("email") || "",
              login: formData.get("login") || "",
              first_name: formData.get("first_name") || "",
              second_name: formData.get("second_name") || "",
              display_name: formData.get("display_name") || "",
              phone: formData.get("phone") || "",
            };

            console.log(data);
            try {
              updateData(data);
            } catch (error) {
              console.log(error);
            }
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
      value: window.store.getState().user.email || "",
      events: [
        {
          selector: 'input[name="email"]',
          event: "blur",
          handler: (_e, componentElement) => {
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
          handler: (_e, componentElement) => {
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
      value: window.store.getState().user.login || "",
      events: [
        {
          selector: 'input[name="login"]',
          event: "blur",
          handler: (_e, componentElement) => {
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
          handler: (_e, componentElement) => {
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
      value: window.store.getState().user.first_name || "",
      events: [
        {
          selector: 'input[name="first_name"]',
          event: "blur",
          handler: (_e, componentElement) => {
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
          handler: (_e, componentElement) => {
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
      value: window.store.getState().user.second_name || "",
      events: [
        {
          selector: 'input[name="second_name"]',
          event: "blur",
          handler: (_e, componentElement) => {
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
          handler: (_e, componentElement) => {
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
      value: window.store.getState().user.display_name || "",
      events: [
        {
          selector: 'input[name="display_name"]',
          event: "blur",
          handler: (_e, componentElement) => {
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
          handler: (_e, componentElement) => {
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
      value: window.store.getState().user.phone || "",
      events: [
        {
          selector: 'input[name="phone"]',
          event: "blur",
          handler: (_e, componentElement) => {
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
          handler: (_e, componentElement) => {
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
    } as const);

    const pfpBlock = new PfpBlock({
      pfpUrl: `https://${coreDomain}/api/v2/resources${
        window.store.getState().user.avatar
      }`,
      username: "John",
      events: [
        {
          selector: "p",
          event: "click",
          handler: () => {
            const modalContainer = document.querySelector(
              ".pfpmodal-wrapper"
            ) as HTMLDivElement;
            if (modalContainer) {
              modalContainer.style.opacity = "1";
              modalContainer.style.visibility = "visible";
            }
          },
        },
      ],
    });

    const modalPfp = new ModalPfp({
      isLoading: this.props.isLoading as boolean,
      events: [
        {
          selector: ".pfpmodal-wrapper",
          event: "click",
          handler: (e) => {
            const eventTarget = e.target as HTMLElement;
            console.log("here");
            if (eventTarget && eventTarget.className == "pfpmodal-wrapper") {
              const modalContainer = document.querySelector(
                ".pfpmodal-wrapper"
              ) as HTMLDivElement;
              modalContainer.style.opacity = "0";
              modalContainer.style.visibility = "hidden";
            }
          },
        },
        {
          selector: "form",
          event: "submit",
          handler: (e, componentElement) => {
            e.preventDefault();
            const formData = new FormData();
            const fileInput = componentElement.querySelector(
              "input[type=file]"
            ) as HTMLInputElement;
            if (fileInput) {
              const files = fileInput.files as FileList;
              console.log(formData, files);
              if (files?.length > 1) {
                alert("More than one image loaded, abort");
                return;
              } else if (files?.length === 1) {
                updatePfp({ avatar: files[0] });
              }
            }
          },
        },
      ],
    });

    this.registerChild("modalPfp", modalPfp);
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
    const context: Record<string, string> = {};

    Object.entries(this._children).forEach(([name]) => {
      console.log(name);
      context[name] = `<div data-component-id="${name}"></div>`;
    });

    return Handlebars.compile(editDataTemplate)(context);
  }
}

const mapStateToProps = (state: unknown) => {
  return {
    user: (state as StoreTypes).user,
  };
};

export default connect(mapStateToProps)(EditData);

// Поведение инпутов можно поменять. Можно вынести логику в контроллер, и отсутствующие поля formdata заполнять через window.store, таким образом можно поменять одно поле, не заполняя остальные.
// Можно вставить текущие значения в плейсхолдеры.
// Пока оставлю так

// "Realtime" обновление аватрки пользователя реализовано на profile странице - при обновлении аватарки она сразу отображается на странице без перезагрузки.
// Но насколько я помню для этого нет жесткого требования, так что добавлять эту логику на все страницы я не стану.
// Я не совсем понял комментарий касательно не работающего функционала обновления аватарки пользователя, но предполагаю что от меня ожидалось что данная функция будет реализована на всех страницах(profile, /edit-data, /edit-password)
