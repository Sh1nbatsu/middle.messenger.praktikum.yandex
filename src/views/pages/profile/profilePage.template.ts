export default `
    <div class="profile__wrapper">
      <div class="left-block">
        <a href="/messenger">
            <img src="/arrow.svg" alt="back arrow" href="/messenger">
        </a>
      </div>
      <div class="main__wrapper">
          {{{ pfpBlock }}}
        <div class="data__wrapper">
          {{{ userEmail }}}
          {{{ userLogin }}}
          {{{ userFirstName }}}
          {{{ userSecondName }}}
          {{{ userDisplayName }}}
          {{{ userPhone }}}
          {{{ modalPfp }}}
        </div>
        <div class="edit__wrapper">
          <div class="data-item">
            <a href="/settings/edit-data">Change information</a>
            <span></span>
          </div>
          <div class="data-item">
            <a href="/settings/edit-password">Change password</a>
            <span></span>
          </div>
          <div class="data-item">
            <a class="logout" href="">Exit account</a>
          </div>
        </div>
      </div>
    </div>`;
