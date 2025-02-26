import { View } from "../View.ts";
import errorPageTemplate from "../../templates/errorPage.template.ts";

export class ErrorView extends View {
  constructor(rootElement: HTMLElement) {
    super(rootElement, errorPageTemplate);
  }

  public render(): void {
    if (!this.rootElement) {
      console.error("Root element is not defined in LoginView!");
      return;
    }

    this.clearContent();

    const contentElement = this.getContentElement();
    if (contentElement) {
      contentElement.innerHTML = this.template({
        errorType: "500",
        errorDesc: "Internal server error",
      });
    }

    // signinLogic();
  }
}
