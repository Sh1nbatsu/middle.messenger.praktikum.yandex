export default `
    <div class="messenger__wrapper">
      <nav class="navigation__wrapper">
        <div class="profile-link">
          <div id="chat-create">
            <p>Create chat</p>
          </div>
          <a href="/settings">Profile<img src="/arrow_gray.svg" alt="arrow"></a>
        </div>
        <form class="search-bar" id="search-bar">
          <input type="text" placeholder="Search" name="chat_search">
          <button type="submit">
            <img src="/search_icon.svg" class="search_icon" alt="search icon" id="search_icon">
          </button>
            {{{UserDropdown}}}
        </form>
        <ul class="chat-select__wrapper">
          {{{ ChatList }}}
        </ul>
        </nav>
        <div class="chat-main">
          <div class="top-block">
            {{{ ChatTop }}}
          </div>
          <div class="messages">
            {{{ MessageList }}}
          </div>
          <div class="bottom-block">
            <form action="" id="send-message">
              <img src="/chat_attachment.svg" alt="chat attachment">
              <input type="text" placeholder="Message" name="message">
              <button>
                <img src="/arrow.svg" alt="send arrow">
              </button>
            </form>
          </div>
        </div>
        <div id="chat-create-popup">
          <form id="chat_create_form">
            <input type="text" placeholder="Enter chat name" name="title">
            <button>Create chat</button>
          </form>
        </div>
        <div id="chat-option-popup">
          <form id="chatoptionform">
            <input type="text" name="user" placeholder="Enter username">
            <button type="submit">Add user</button>
            {{{ ChatUserDropdown }}}
          </form>
        </div>
        <div class="chat-avatar-popup">
          {{{ chatPfp }}}
        </div>
      </div>`;
// C модалками ситуация такая, что можно было бы создать отдельный класс или сущность для управления ими, это правильно, но сложно, необходимо будет изменять стор, на основании его состояния вставлять модалки в отдельный див внутри корня, менять их стили и тд.
// Времени нет, так что пока хардкод
