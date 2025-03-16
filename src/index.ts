import "./styles/main.scss";

import { Login } from "./views/pages/login";
import { SignUp } from "./views/pages/signup";
import { Error } from "./views/pages/error";
import { EditData } from "./views/pages/editData";
import { EditPassword } from "./views/pages/editPassword";
import { ProfilePage } from "./views/pages/profile";
import { Messenger } from "./views/pages/messenger";

import Router from "./core/Router";
import Store, { StoreEvents } from "./core/Store";
import HTTPTransport from "./core/httpTransport";

const http = new HTTPTransport();

http
  .get("https://jsonplaceholder.typicode.com/posts/1")
  .then((xhr: XMLHttpRequest) => {
    console.log(xhr.responseText);
  });

window.router = new Router();

window.store = new Store({
  isLoading: false,
  user: null,
  loginError: null,
});

document.addEventListener("DOMContentLoaded", () => {
  window.store.on(StoreEvents.Updated, (prevState, nextState) => {
    console.log("prevState", prevState);
    console.log("nextState", nextState);
  });

  async function begin() {
    try {
      const response = await http.get(
        "https://ya-praktikum.tech/api/v2/auth/user"
      );

      let user = null;

      switch (response.status) {
        case 401:
          window.router.go("/login");
          break;

        case 200:
          user = JSON.parse(response.response);
          window.store.setState({ user });
          break;
      }
    } catch (error) {
      console.error(error);
    } finally {
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

      if (window.location.pathname === "/" && window.store.getState().user) {
        window.router.go("/messenger");
      }

      // Костыльная логика связанная с работой роутера(при вводе в адресной строке страницы логина или любой другой страницы браузер вызывает перезапуск страницы), но это не является критичным
      // Кажется
      // Так что пока я это оставлю
      // По грамотному надо вообще добавить так же работу с hashchange в роутере, тогда надо будет думать как делать проверки и редирект в случае если пользователь авторизован
      // А асинхронщина в начале нужна для того, что бы при рендере страниц приложение не падало ввиду того, что компоненты не могут получить данные из store(например о пользователе), которых еще нет
      // Однажды мне предстоит ответить за свои грехи
    }
  }

  begin();
});
