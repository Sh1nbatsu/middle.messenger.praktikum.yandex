export default `
  {{#if date}}<div class="date">{{date}}</div> {{/if}}
  {{#if youSend}}            
            <div class="sent-message">
              <p>{{messageText}}</p>
              <p class="message-date">{{messageTime}}</p>
            </div>
  {{/if}}
  {{#unless date }}
  {{#unless youSend}} 
        <div class="message">
              <p>{{messageText}}</p>
              <p class="message-date">{{messageTime}}</p>
            </div>
  {{/unless}}
  {{/unless}}
`;
