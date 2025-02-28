import Handlebars from "handlebars";

export abstract class View {
    protected rootElement: HTMLElement | null;
    protected template: Handlebars.TemplateDelegate = Handlebars.compile('');

    constructor(rootElement: HTMLElement, templateString: string) { 
        this.rootElement = rootElement;
        if (!this.rootElement) {
            console.error(`Root element '${rootElement}' not found!`);
            return;
        } else {
        this.template = this.compileTemplate(templateString);
        }
    }

    protected compileTemplate(templateString: string): Handlebars.TemplateDelegate {
        return Handlebars.compile(templateString);
    }

    public abstract render(): void;

    protected getContentElement(): HTMLElement | null {
        return this.rootElement;
    }

    protected clearContent(): void {
        if (this.rootElement) {
            this.rootElement.innerHTML = '';
        }
    }
}