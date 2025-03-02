import { Login } from "./pages/login";
import { SignUp } from "./pages/signup";
import { Error } from "./pages/error";
import { EditData } from "./pages/editData";
import { EditPassword } from "./pages/editPassword";
import { ProfilePage } from "./pages/profile";
import { Messenger } from "./pages/messenger";

import renderDOM from "./core/RenderDom";

import "./styles/main.scss";

const pages: Record<string, any> = {
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

function navigate(page: string): void {
  console.log("navigate");
  const [Component, context] = pages[page];
  if (typeof Component === "function") {
    // console.log(new Component(context));
    renderDOM(new Component(context));
    console.log(context);
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
