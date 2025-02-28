// debugger;
// console.trace();

import Handlebars from "handlebars";
import { Login } from "./pages/login";
import renderDOM from "./core/RenderDom";

import "./styles/main.scss";

const pages: Record<string, any> = {
  login: [Login],
};

function navigate(page: string): void {
  console.log("navigate");
  const [Component, context] = pages[page];
  if (typeof Component === "function") {
    console.log(new Component(context));
    renderDOM(new Component(context));
  }
}

document.addEventListener("DOMContentLoaded", () => {
  navigate("login");
});
