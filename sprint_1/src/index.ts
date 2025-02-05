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
    
    loginInput.addEventListener("input", () => {
      (topText as HTMLElement).style.transform = "translate(-8%, 0) scale(0.8)";
      if (!loginInput.value) {
        (topText as HTMLElement).style.transform = "translateY(20px)";
      }
    });
  });

  // const loginInputDiv = document.getElementById(
  //   "login__input-div"
  // ) as HTMLDivElement;

  // const loginInput = loginInputDiv.querySelector("input")!;

  // const loginTopText = loginInputDiv.querySelector(".top_text");

  // const passwordInputDiv = document.getElementById(
  //   "password__input-div"
  // ) as HTMLDivElement;

  // const passwordInput = passwordInputDiv.querySelector("input")!;

  // const passwordTopText = passwordInputDiv.querySelector(".top_text");

  // loginInput.addEventListener("input", () => {
  //   (loginTopText as HTMLElement).style.transform = "translate(-8%, 0) scale(0.8)";
  //   console.log("Input changed");
  //   if (!loginInput.value) {
  //     (loginTopText as HTMLElement).style.transform = "translateY(20px)";
  //   }
  // });

  // passwordInput.addEventListener("input", () => {
  //   (passwordTopText as HTMLElement).style.transform = "translate(-8%, 0) scale(0.8)";
  //   console.log("Input changed");
  //   if (!passwordInput.value) {
  //     (passwordTopText as HTMLElement).style.transform = "translateY(20px)";
  //   }
  // });

  // document.querySelector(".login__form")?.addEventListener("submit", (e) => {
  //   e.preventDefault();
  //   console.log("Form submitted");
  // });

  // const registerLink = document.querySelector(".register__link a")!;

  // registerLink.addEventListener("click", (e) => {
  //   e.preventDefault();
  //   console.log("Register link clicked");
  // });
});
