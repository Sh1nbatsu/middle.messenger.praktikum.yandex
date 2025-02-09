export default `
          <div class="chat-select__item">
            <div class="chat-pfp">
              <img src="{{pfpUrl}}" alt="">
            </div>
            <div class="chat-info">
              <div class="chat-paylod">
                <h2>{{chatName}}</h2>
                <p>{{#if youSend}}<span>You: </span>{{/if}}{{lastData}}</p>
              </div>
              <div class="chat-data">
                <p class="last-time">{{lastTime}}</p>
                {{#if unreadAmount}}
                <p class="unread-amount">{{unreadAmount}}</p>
                {{/if}}
              </div>
            </div>
          </div>
`