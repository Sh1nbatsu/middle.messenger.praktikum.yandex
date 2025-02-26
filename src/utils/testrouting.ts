// Тут я пытался сделать роутинг. Он быстрее чем вариант в intex.ts, так как работает через spa(?), но он очень костыльный - не работает переход через ручной ввод в адресной строке.
// В принципе и тот, что в index.ts тоже костыльный.

import Handlebars from "handlebars";

import loginInputPartial from "../partials/components/loginInput/loginInput.partial.ts";

import mainButtonPartial from "../partials/components/mainButton/mainButton.partial.ts";

import "../styles/main.scss";

import "../styles/loginStyles.scss";

import loginPageTemplate from "../templates/loginPage/loginPage.template.ts";

import signinPageTemplate from "../templates/signinPage.template.ts";

import errorPageTemplate from "../templates/errorPage.template.ts";

import aliveLogin from "./animateInputs.ts";

Handlebars.registerPartial("loginInputPartial", loginInputPartial);

Handlebars.registerPartial("mainButtonPartial", mainButtonPartial);

document.addEventListener("DOMContentLoaded", () => {
  const root = document.querySelector("#root") as HTMLElement;

  let template: Handlebars.TemplateDelegate | undefined;

  template = Handlebars.compile(loginPageTemplate);
  root.innerHTML = template({});
  aliveLogin();

  function router() {
    document.querySelector("a")?.addEventListener("click", (e) => {
      e.preventDefault();

      const item = e.target as HTMLAnchorElement;

      switch (item.pathname) {
        case "/":
          template = Handlebars.compile(loginPageTemplate);
          root.innerHTML = template({});
          aliveLogin();
          router();
          break;
        case "/signin":
          template = Handlebars.compile(signinPageTemplate);
          root.innerHTML = template({});
          aliveLogin();
          router();
          break;
        case "/500":
          template = Handlebars.compile(errorPageTemplate);
          root.innerHTML = template({
            errorType: "500",
            errorDesc: "Internal server error",
          });
          router();
          break;
        case "/404":
          template = Handlebars.compile(errorPageTemplate);
          root.innerHTML = template({
            errorType: "404",
            errorDesc: "How did you get here?",
          });
          router();
          break;
        default:
          break;
      }
    });

    document.querySelector("a")?.removeEventListener("click", () => {});
  }

  router();
});
