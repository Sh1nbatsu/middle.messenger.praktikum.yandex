import Block from "../../core/Block.ts";
import signinPageTemplate from "./signinPage.template.ts";
import Handlebars from "handlebars";

import loginInputPartial from "../../components/loginInput/loginInput.partial.ts";
import mainButtonPartial from "../../old/partials/components/mainButton/mainButton.partial.ts";

Handlebars.registerPartial("loginInputPartial", loginInputPartial);
Handlebars.registerPartial("mainButtonPartial", mainButtonPartial);

export default class Login extends Block {
  constructor(props = {}) {
    console.log("Login props:", props);
    super("div", props);
  }

  render(): string {
    console.log("Raw template:", signinPageTemplate);
    const compiledTemplate = Handlebars.compile(signinPageTemplate);
    return compiledTemplate(this.props);
  }
}
