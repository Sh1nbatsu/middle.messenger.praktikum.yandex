import Block from "../../../core/Block.ts";
import Handlebars from "handlebars";
import pfpBlockPartial from "./pfpBlock.partial.ts";

export interface pfpBlockProps {
  pfpUrl: string;
  username: string;
  events?: [
    {
      selector: string;
      event: string;
      handler: (e: unknown, componentElement?: HTMLElement) => void;
    }
  ];
}

export default class PfpBlock extends Block {
  constructor(props: pfpBlockProps) {
    super("div", props);
  }

  render(): string {
    const compiledTemplate = Handlebars.compile(pfpBlockPartial);
    return compiledTemplate(this.props);
  }
}
