import Handlebars from "handlebars";

import loginInputPartial from "./partials/loginInput.partial";

import "./styles/main.scss";

import "./styles/loginStyles.scss";

import loginPageTemplate from "./template/loginPage.template";

Handlebars.registerPartial("loginInputPartial", loginInputPartial);

document.addEventListener("DOMContentLoaded", () => {
  // Я не знаю что делать с ошибками ts, поэтому я оставил все как есть, так как оно работает.
  // Единственный другой способ это обернуть все в if, что выглядит уродливо

  const root = document.querySelector("#root")!;

  const template = Handlebars.compile(loginPageTemplate);

  root.innerHTML = template({});

  const inputDivList = document.querySelectorAll("#input-div");

  inputDivList.forEach((inputDiv) => {
    const loginInput = inputDiv.querySelector("input")!;

    const topText = inputDiv.querySelector(".top__text");

    const bottomText = inputDiv.querySelector(".bottom__text") as HTMLElement;

    loginInput.addEventListener("input", () => {
      (topText as HTMLElement).style.transform = "translate(-8%, 0) scale(0.8)";
      if (!loginInput.value) {
        (topText as HTMLElement).style.transform = "translateY(20px)";
      }
    });

    loginInput.addEventListener("blur", () => {
      bottomText.style.opacity = "1";
      bottomText.style.transform = "translateY(0)";
      setTimeout(() => {
        bottomText.style.opacity = "0";
        bottomText.style.transform = "translateY(-18px)";
      }, 2000);
    });

    loginInput.addEventListener("focus", () => {
      bottomText.style.opacity = "0";
      bottomText.style.transform = "translateY(-18px)";
    });

    // Пока оно будет автоматом выдавать ошибки, потом будем обрабатывать запросы как минимум на инпут логина при потере фокуса сразу отправлять запрос на сервер что бы проверить есть ли такой пользователь, если нет то выводить ошибку
    // С паролем понятно, если логин есть, то проверяем пароль, если пароль не верный, то выводим ошибку
  });
});
