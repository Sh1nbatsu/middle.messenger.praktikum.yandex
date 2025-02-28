import { View } from "../View";
import loginPageTemplate from "../../pages/login/loginPage.template.ts";
// import loginLogic from '../../utils/loginLogic';

export class LoginView extends View {
  constructor(rootElement: HTMLElement) {
    super(rootElement, loginPageTemplate);
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

    // loginLogic();
  }
}
