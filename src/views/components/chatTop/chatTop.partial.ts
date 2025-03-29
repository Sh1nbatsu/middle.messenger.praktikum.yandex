export default `
            <div>
              <img src='{{ pfpUrl}}' alt="chat avatar" class="chat-pfp">
              <p>{{ name }}</p>  
            </div>
              <img src="/three_dots.svg" alt="options" class="options" id="options">
            <div class="chat-dropdown" id="chat-dropdown">
              <div class="chat-option" id="delete_user">
                <img src="/chat-cross.svg" alt="">
                <p>Delete user from chat</p>
              </div>
              <div class="chat-option" id="delete_chat">
                <img src="/chat-cross.svg" alt="">
                <p>Delete chat entirely</p>
              </div>
            </div>
`;
