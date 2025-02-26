import Handlebars from "handlebars";

import "./styles/main.scss";

import loginInputPartial from "./partials/components/loginInput/loginInput.partial.ts";
import mainButtonPartial from "./partials/components/mainButton/mainButton.partial.ts";
import userDataPartial from "./partials/components/userData/userData.partial.ts";
import chatItemPartial from "./partials/components/chatItem/chatItem.partial.ts";
import editInputPartial from "./partials/components/editInput/editInput.partial.ts";

import loginPageTemplate from "./templates/loginPage/loginPage.template.ts";
import signinPageTemplate from "./templates/signinPage.template.ts";
import errorPageTemplate from "./templates/errorPage.template.ts";
import messengerPageTemplate from "./templates/messengerPage.template.ts";
import profilePageTemplate from "./templates/profilePage.template.ts";
import editProfileDataTemplate from "./templates/editData.template.ts";
import editPasswordTemplate from "./templates/editPassword.template.ts";

Handlebars.registerPartial("loginInputPartial", loginInputPartial);
Handlebars.registerPartial("mainButtonPartial", mainButtonPartial);
Handlebars.registerPartial("userDataPartial", userDataPartial);
Handlebars.registerPartial("chatItemPartial", chatItemPartial);
Handlebars.registerPartial("editInputPartial", editInputPartial);

import editDataLogic from "./utils/editDataLogic.ts";
// import { LoginView } from "./views/pages/loginView.ts";
// import { SigninView } from "./views/pages/signinView.ts";
// import { ErrorView } from "./views/pages/errorView.ts";
// import { MessengerView } from "./views/pages/messengerView.ts";

document.addEventListener("DOMContentLoaded", () => {
  const root = document.querySelector("#root") as HTMLElement;

  let template: Handlebars.TemplateDelegate | undefined;

  switch (window.location.pathname) {
    case "/":
      template = Handlebars.compile(loginPageTemplate);
      root.innerHTML = template({});
      break;
    case "/signin":
      template = Handlebars.compile(signinPageTemplate);
      root.innerHTML = template({});
      break;
    case "/500":
      template = Handlebars.compile(errorPageTemplate);
      root.innerHTML = template({});
      break;
    case "/im":
      template = Handlebars.compile(messengerPageTemplate);
      root.innerHTML = template({});
      break;
    case "/profile":
      template = Handlebars.compile(profilePageTemplate);
      root.innerHTML = template({});
      break;
    case "/edit_data":
      template = Handlebars.compile(editProfileDataTemplate);
      root.innerHTML = template({});
      editDataLogic();
      break;
    case "/edit_password":
      template = Handlebars.compile(editPasswordTemplate);
      root.innerHTML = template({});
      break;
    default:
      template = Handlebars.compile(errorPageTemplate);
      root.innerHTML = template({
        errorType: "404",
        errorDesc: "How did you get here?",
      });
      break;
  }
});
