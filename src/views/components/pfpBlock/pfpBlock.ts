import Block from "../../../core/Block.ts";
import Handlebars from "handlebars";
import pfpBlockPartial from "./pfpBlock.partial.ts";

interface Event {
  selector: string;
  event: string;
  handler: (e: Event, componentElement?: HTMLElement) => void;
}

export interface PfpBlockProps {
  pfpUrl: string;
  username: string;
  events?: Event[];
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
