import Block from "../../../core/Block.ts";
import Handlebars from "handlebars";
import pfpBlockPartial from "./pfpBlock.partial.ts";
import { CustomEvent } from "../../../core/Block.ts";


export interface PfpBlockProps {
  pfpUrl: string;
  username: string;
  events?: CustomEvent[];
}

export default class PfpBlock extends Block {
  constructor(props: PfpBlockProps) {
    super("div", props);
  }

  render(): string {
    const compiledTemplate = Handlebars.compile(pfpBlockPartial);
    return compiledTemplate(this.props);
  }
}
