export default `
    <div class="profile__wrapper">
      <div class="left-block">
        <a href="/settings">
            <img src="/arrow.svg" alt="back arrow" href="/settings">
        </a>
      </div>
      <form class="main__wrapper" id="password-form">
          {{{ pfpBlock }}}
        <div class="data__wrapper">
          {{{ oldPasswordInput }}}
          {{{ newPasswordInput }}}
          {{{ confirmPasswordInput}}}
          {{{ modalPfp }}}
        </div>
        {{{ mainButton }}}
      </form>
    </div>`;
