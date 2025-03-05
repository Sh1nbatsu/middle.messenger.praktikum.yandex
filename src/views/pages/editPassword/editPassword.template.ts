export default `
    <div class="profile__wrapper">
      <div class="left-block">
        <a href="/im">
            <img src="/arrow.svg" alt="back arrow">
        </a>
      </div>
      <form class="main__wrapper" id="password-form">
        <div class="pfp__wrapper">
          {{{ pfpBlock }}}
        </div>
        <div class="data__wrapper">
          {{{ oldPasswordInput }}}
          {{{ newPasswordInput }}}
          {{{ confirmPasswordInput}}}
        </div>
        {{{ mainButton }}}
      </form>
    </div>`;
