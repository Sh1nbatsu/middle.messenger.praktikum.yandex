import { Login } from "./views/pages/login";
import { SignUp } from "./views/pages/signup";
import { Error } from "./views/pages/error";
import { EditData } from "./views/pages/editData";
import { EditPassword } from "./views/pages/editPassword";
import { ProfilePage } from "./views/pages/profile";
import { Messenger } from "./views/pages/messenger";

import renderDOM from "./core/RenderDom";

import "./styles/main.scss";

import HTTPTransport from "./services/fetch";

const transport = new HTTPTransport();

transport
  .get("https://jsonplaceholder.typicode.com/posts/1")
  .then((value: unknown) => {
    const xhr = value as XMLHttpRequest;
    console.log(xhr.responseText);
  })
  .catch((error) => {
    console.error(error);
  });

const pages: Record<string, unknown> = {
  login: [Login],
  signUp: [SignUp],
  error: [
    Error,
    {
      errorType: 500,
      errorDesc: "Something went wrong",
    },
  ],
  notFound: [
    Error,
    {
      errorType: 404,
      errorDesc: "How did you get here?",
    },
  ],
  editData: [EditData],
  editPassword: [EditPassword],
  profilePage: [ProfilePage],
  messenger: [Messenger],
};

function navigate(page: string) {
  console.log("navigate");
  const Page = pages[page];
  const Component = Array.isArray(Page) ? Page[0] : Page;
  const context = Array.isArray(Page) ? Page[1] : undefined;

  if (typeof Component === "function") {
    const componentInstance = context
      ? new Component(context)
      : new Component();

    renderDOM(componentInstance);

    if (context) {
      console.log(context);
    }
  }
}
document.addEventListener("DOMContentLoaded", () => {
  switch (window.location.pathname) {
    case "/":
      navigate("login");
      break;
    case "/signup":
      navigate("signUp");
      break;
    case "/500":
      navigate("error");
      break;
    case "/im":
      navigate("messenger");
      break;
    case "/profile":
      navigate("profilePage");
      break;
    case "/edit_data":
      navigate("editData");
      break;
    case "/edit_password":
      navigate("editPassword");
      break;
    default:
      navigate("notFound");
      break;
  }
});
