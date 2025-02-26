import { View } from '../View.ts';
import signinPageTemplate from '../../templates/signinPage.template.ts';
// import signinLogic from '../../utils/loginLogic.ts';

export class SigninView extends View { 

    constructor(rootElement: HTMLElement) {
        super(rootElement, signinPageTemplate); 
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

        // signinLogic();
    }
}