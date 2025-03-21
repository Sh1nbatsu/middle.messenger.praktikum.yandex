export default `
            <div>
              <img src='{{ pfpUrl}}' alt="profile picture">
              <p>{{ name }}</p>  
            </div>
              <img src="/three_dots.svg" alt="options" class="options" id="options">
            <div class="chat-dropdown" id="chat-dropdown">
              <div class="chat-option" id="add_user">
                <img src="/chat-cross.svg" alt="">
                <p>Add user to chat</p>
              </div>
              <div class="chat-option" id="delete_user">
                <img src="/chat-cross.svg" alt="">
                <p>Delete user from chat</p>
              </div>
            </div>
`;
