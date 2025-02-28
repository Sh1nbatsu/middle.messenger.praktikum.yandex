import { View } from "../View";
import messengerPageTemplate from "../../pages/messengerPage.template.ts";

export class MessengerView extends View {
  constructor(rootElement: HTMLElement) {
    super(rootElement, messengerPageTemplate);
  }

  public render(): void {
    if (!this.rootElement) {
      console.error("Root element is not defined in LoginView!");
      return;
    }

    this.clearContent();

    const contentElement = this.getContentElement();
    if (contentElement) {
      contentElement.innerHTML = this.template({});
    }
  }
}
