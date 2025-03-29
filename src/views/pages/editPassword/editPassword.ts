import Block from "../../../core/Block";
import editPasswordTemplate from "./editPassword.template";
import Handlebars from "handlebars";
import { validateAll } from "../../../services/validation";
import {
  updatePassword,
  updatePfp,
} from "../../../domain/profile/profileController";

import { MainButton } from "../../components/mainButton/";
import { EditInput } from "../../components/editInput";
import { PfpBlock } from "../../components/pfpBlock";
import coreDomain from "../../../domain/coreDomain";
import { ModalPfp } from "../../components/modalPfp";

export default class EditPassword extends Block {
  constructor(props = {}) {
    super("div", {
      ...props,
    });
  }

  init() {
    super.init();

    this.props.events = [
      {
        selector: "#password-form",
        event: "submit",
        handler: (e: SubmitEvent) => {
          let isValid = true;

          e.preventDefault();

          const Components = [
            this._children.newPasswordInput.element,
            this._children.confirmPasswordInput.element,
          ];

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
            formData.delete("password");
            const oldPassword = formData.get("old_password");
            const newPassword = formData.get("confirm_password");
            console.log({ oldPassword, newPassword });
            if (oldPassword && newPassword) {
              try {
                updatePassword({
                  oldPassword: oldPassword as string,
                  newPassword: newPassword as string,
                });
              } catch (error) {
                console.log(error);
              }
            }
          }
        },
      } as const,
    ];

    const mainButton = new MainButton({
      buttonText: "Submit",
      buttonType: "submit",
    } as const);

    const oldPasswordInput = new EditInput({
      inputDesc: "Old password",
      inputType: "password",
      inputName: "old_password",
      errorMessage: "Invalid password",
      placeholder: "●●●●●●●●●",
      required: true,
    } as const);

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
    } as const);

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

            if (!validateAll(input).isPassed && input.value) {
              input.className = "error";
              setTimeout(() => {
                input.className = "";
              }, 300);
            }
          },
        },
      ],
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
