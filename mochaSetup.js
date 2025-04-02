import { JSDOM } from "jsdom";
/* eslint-disable no-undef */
// import Store from "./src/core/Store.ts";
const jsdom = new JSDOM("<body></body>", { url: "http://localhost" });

global.window = jsdom.window;
global.document = jsdom.window.document;
global.FormData = jsdom.window.FormData;
global.MouseEvent = jsdom.window.MouseEvent;
global.InputEvent = jsdom.window.InputEvent;

// global.window.store = new Store({
//   isLoading: false,
//   user: null,
//   loginError: null,
//   chats: null,
//   currentChat: null,
//   searchResult: null,
//   messages: null,
// });
