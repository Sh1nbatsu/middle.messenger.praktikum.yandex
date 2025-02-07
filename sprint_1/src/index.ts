import Handlebars from "handlebars";

import loginInputPartial from "./partials/loginInput.partial.ts";

import mainButtonPartial from "./partials/mainButton.partial.ts";

import "./styles/main.scss";

import "./styles/loginStyles.scss";

import loginPageTemplate from "./templates/loginPage.template.ts";

import signinPageTemplate from "./templates/signinPage.template.ts";

import errorPageTemplate from "./templates/errorPage.template.ts";

import aliveLogin from "./utils/login.ts";

Handlebars.registerPartial("loginInputPartial", loginInputPartial);

Handlebars.registerPartial("mainButtonPartial", mainButtonPartial);

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
    default:
  }
});
