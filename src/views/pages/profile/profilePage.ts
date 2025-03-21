import Block from "../../../core/Block";
import profilePageTemplate from "./profilePage.template";
import Handlebars from "handlebars";

import { UserData } from "../../components/userData";
import { PfpBlock } from "../../components/pfpBlock";
import { connect } from "../../../utils/connect";
import { ModalPfp } from "../../components/modalPfp";
import { logoutController } from "../../../domain/auth/authController";
import { updatePfp } from "../../../domain/profile/profileController";
export class ProfilePage extends Block {
  constructor(props = {}) {
    super("div", {
      ...props,
      events: [
        {
          selector: ".logout",
          event: "click",
          handler: (e) => {
            e.preventDefault();
            logoutController();
          },
        },
      ],
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
      pfpUrl: `https://ya-praktikum.tech/api/v2/resources${
        window.store.getState().user.avatar
      }`,
      username: "John",
      events: [
        {
          selector: "p",
          event: "click",
          handler: (e) => {
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
      isLoading: this.props.isLoading,
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
                // const modalContainer = document.querySelector(
                //   ".pfpmodal-wrapper"
                // ) as HTMLDivElement;
                // setTimeout(() => {
                //   modalContainer.style.opacity = "0";
                //   modalContainer.style.visibility = "hidden";
                // }, 1500);
              }
            }
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
    this.registerChild("modalPfp", modalPfp);
  }

  componentDidUpdate(oldProps, newProps) {
    return true;
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
    isLoading: state.isLoading,
  };
};

export default connect(mapStateToProps)(ProfilePage);
