import Block from "../../../core/Block.ts";
import Handlebars from "handlebars";
import mainButtonPartial from "./mainButton.partial.ts";

Handlebars.registerPartial("mainButtonPartial", mainButtonPartial)

interface mainButtonProps {
  buttonType: string;
  buttonText: string;
}

export class mainButton extends Block {
  private template: Handlebars.TemplateDelegate;

  constructor(props: mainButtonProps) {
    super("div", props);
    this.template = Handlebars.compile(mainButtonPartial)
  }

  render() {
    return this.template(this.props);
  }
}