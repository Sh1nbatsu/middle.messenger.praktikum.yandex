import Handlebars from "handlebars";

import "./styles/main.scss";

import loginInputPartial from "./partials/loginInput.partial.ts";

import mainButtonPartial from "./partials/mainButton.partial.ts";

import userDataPartial from "./partials/userData.partial.ts";

import chatItemPartial from "./partials/chatItem.partial.ts";

import loginPageTemplate from "./templates/loginPage.template.ts";

import signinPageTemplate from "./templates/signinPage.template.ts";

import errorPageTemplate from "./templates/errorPage.template.ts";

import messengerPageTemplate from "./templates/messengerPage.template.ts";

import profilePageTemplate from "./templates/profilePage.template.ts";

Handlebars.registerPartial("loginInputPartial", loginInputPartial);

Handlebars.registerPartial("mainButtonPartial", mainButtonPartial);

Handlebars.registerPartial("userDataPartial", userDataPartial);

Handlebars.registerPartial("chatItemPartial", chatItemPartial);

import aliveLogin from "./utils/login.ts";

document.addEventListener("DOMContentLoaded", () => {
  const root = document.querySelector("#root") as HTMLElement;

  let template: Handlebars.TemplateDelegate | undefined;

  switch (window.location.pathname) {
    case "/":
      template = Handlebars.compile(loginPageTemplate);
      root.innerHTML = template({});
      aliveLogin();
      break;
    case "/signin":
      template = Handlebars.compile(signinPageTemplate);
      root.innerHTML = template({});
      aliveLogin();
      break;
    case "/500":
      template = Handlebars.compile(errorPageTemplate);
      root.innerHTML = template({
        errorType: "500",
        errorDesc: "Internal server error",
      });
      break;
    case "/404":
      template = Handlebars.compile(errorPageTemplate);
      root.innerHTML = template({
        errorType: "404",
        errorDesc: "How did you get here?",
      });
      break;
    case "/im":
      template = Handlebars.compile(messengerPageTemplate);
      root.innerHTML = template({});
      break;
    case "/profile":
      template = Handlebars.compile(profilePageTemplate);
      root.innerHTML = template({});
      break;
    default:
  }
});
