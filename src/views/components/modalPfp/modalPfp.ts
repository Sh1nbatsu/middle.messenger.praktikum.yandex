import Block, { BlockProps } from "../../../core/Block.ts";
import Handlebars from "handlebars";
import modalPfpPartial from "./modalPfp.partial.ts";
import MainButton from "../mainButton/mainButton.ts";
import { CustomEvent } from "../../../core/Block.ts";
import { connect } from "../../../utils/connect.ts";
import { StoreTypes } from "../../../core/Store.ts";
export interface ModalProps {
  events?: CustomEvent[];
  isLoading: boolean | null;
}

interface updateProps extends BlockProps {
  isLoading: boolean | null;
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

  componentDidUpdate(oldProps: updateProps, newProps: updateProps) {
    console.log("componentDidUpdate", oldProps, newProps);
    if (oldProps.isLoading !== newProps.isLoading) {
      console.log(newProps.isLoading);
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

const mapStateToProps = (state: unknown) => {
  return {
    isLoading: (state as StoreTypes).isLoading,
  };
};

export default connect(mapStateToProps)(ModalPfp);
