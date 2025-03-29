export default `<button type="{{buttonType}}"{{#if isLoading}}disabled{{/if}}>{{#if isLoading}}Loading{{/if}}{{#unless isLoading}}{{buttonText}}{{/unless}}</button>`;
