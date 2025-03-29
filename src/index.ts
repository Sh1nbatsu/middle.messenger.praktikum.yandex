import "./styles/main.scss";

// Часть моментов из "можно лучше" не смог исправить из за логики работы кода(например касательно Block)

import { Login } from "./views/pages/login";
import { SignUp } from "./views/pages/signup";
import { Error } from "./views/pages/error";
import { EditData } from "./views/pages/editData";
import { EditPassword } from "./views/pages/editPassword";
import { ProfilePage } from "./views/pages/profile";
import { Messenger } from "./views/pages/messenger";

import Router from "./core/Router";
import Store, { StoreEvents } from "./core/Store";
import { getUserController } from "./domain/auth/authController";
import { GetChats } from "./domain/chats/chatsController";
import { BlockProps } from "./core/Block";

window.router = new Router();
window.store = new Store({
  isLoading: false,
  user: null,
  loginError: null,
  chats: null,
  currentChat: null,
  searchResult: null,
  messages: null,
});

document.addEventListener("DOMContentLoaded", async () => {
  window.store.on(
    StoreEvents.Updated,
    (prevState: BlockProps, nextState: BlockProps) => {
      console.log("prevState", prevState);
      console.log("nextState", nextState);
    }
  );

  await getUserController();

  await GetChats();

  window.router
    .use("/", Login)
    .use("/sign-up", SignUp)
    .use("/settings", ProfilePage)
    .use("/settings/edit-data", EditData)
    .use("/settings/edit-password", EditPassword)
    .use("/messenger", Messenger)
    .use("/404", Error, {
      errorType: 404,
      errorDesc: "How did you get here?",
    })
    .start();

});
