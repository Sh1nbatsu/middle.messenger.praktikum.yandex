import Block from "../../../core/Block.ts";
import Handlebars from "handlebars";
import modalPfpPartial from "./modalPfp.partial.ts";
import MainButton from "../mainButton/mainButton.ts";
import { CustomEvent } from "../../../core/Block.ts";
import { connect } from "../../../utils/connect.ts";
export interface ModalProps {
  events?: CustomEvent[];
  isLoading: boolean;
}

export class ModalPfp extends Block {
  constructor(props: ModalProps) {
    super("div", {
      ...props,
    });
  }

  init() {
    super.init();

    const mainButton = new MainButton({
      buttonType: "submit",
      buttonText: "Change",
      isLoading: this.props.isLoading as boolean | undefined,
    });

    this.registerChild("MainButton", mainButton);
  }

  componentDidUpdate(oldProps, newProps) {
    console.log("componentDidUpdate", oldProps, newProps);
    if (oldProps.isLoading !== newProps.isLoading) {
      console.log("Updating MainButton with isLoading:", newProps.isLoading);
      this._children.MainButton.setProps({
        isLoading: newProps.isLoading,
      });
    }
    return true;
  }

  render(): string {
    const context: Record<string, string> = {};

    Object.entries(this._children).forEach(([name]) => {
      console.log(name);
      context[name] = `<div data-component-id="${name}"></div>`;
    });

    return Handlebars.compile(modalPfpPartial)(context);
  }
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.isLoading,
  };
};

export default connect(mapStateToProps)(ModalPfp);
