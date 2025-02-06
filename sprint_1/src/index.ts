import Handlebars from "handlebars";

import loginInputPartial from "./partials/loginInput.partial";

import "./styles/main.scss";

import "./styles/loginStyles.scss";

import loginPageTemplate from "./templates/loginPage.template.ts";

import signinPageTemplate from "./templates/signinPage.template.ts";

import aliveLogin from "./utils/login.ts";

Handlebars.registerPartial("loginInputPartial", loginInputPartial);

document.addEventListener("DOMContentLoaded", () => {

  const root = document.querySelector("#root") as HTMLElement;

  let template: Handlebars.TemplateDelegate | undefined;

  // Так как я сразу писал логику для страниц, анимации и тд, решил пока сделать такой костыль. 
  // Как сделать иначе я не знаю.
  // По крайней мере я смогу просто переиспользовать логику event listener'ов и тд.

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
    default:
  }

  // const aliveLogin = () => {
  //   const inputDivList = document.querySelectorAll("#input-div");

  //   inputDivList.forEach((inputDiv) => {
  //     const loginInput = inputDiv.querySelector("input")!;

  //     const topText = inputDiv.querySelector(".top__text");

  //     const bottomText = inputDiv.querySelector(".bottom__text") as HTMLElement;

  //     loginInput.addEventListener("input", () => {
  //       (topText as HTMLElement).style.transform =
  //         "translate(-8%, 0) scale(0.8)";
  //       if (!loginInput.value) {
  //         (topText as HTMLElement).style.transform = "translateY(20px)";
  //       }
  //     });

  //     loginInput.addEventListener("blur", () => {
  //       bottomText.style.opacity = "1";
  //       bottomText.style.transform = "translateY(0)";
  //       setTimeout(() => {
  //         bottomText.style.opacity = "0";
  //         bottomText.style.transform = "translateY(-18px)";
  //       }, 2000);
  //     });

  //     loginInput.addEventListener("focus", () => {
  //       bottomText.style.opacity = "0";
  //       bottomText.style.transform = "translateY(-18px)";
  //     });

  //     console.log(window.location.pathname);
  //   });
  // };
  // Пока оно будет автоматом выдавать ошибки, потом будем обрабатывать запросы как минимум на инпут логина при потере фокуса сразу отправлять запрос на сервер что бы проверить есть ли такой пользователь, если нет то выводить ошибку
  // С паролем понятно, если логин есть, то проверяем пароль, если пароль не верный, то выводим ошибку
});
