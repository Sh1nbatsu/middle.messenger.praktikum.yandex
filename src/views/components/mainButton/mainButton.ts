import Block, { BlockProps } from "../../../core/Block.ts";
import Handlebars from "handlebars";
import mainButtonPartial from "./mainButton.partial.ts";
import { CustomEvent } from "../../../core/Block.ts";
import { connect } from "../../../utils/connect.ts";
import { StoreTypes } from "../../../core/Store.ts";

export interface MainButtonProps extends BlockProps {
  buttonType: string;
  buttonText: string;
  isLoading?: boolean;
  events?: CustomEvent[];
}

export class MainButton extends Block {
  constructor(props: MainButtonProps) {
    super("div", props);
  }

  render(): string {
    const compiledTemplate = Handlebars.compile(mainButtonPartial)(this.props);
    return compiledTemplate;
  }
}

const mapStateToProps = (state: StoreTypes) => {
  return {
    isLoading: state.isLoading,
  };
};

export default connect(mapStateToProps)(MainButton);
