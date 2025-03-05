export default `
    <div class="profile__wrapper">
      <div class="left-block">
        <a href="/im">
            <img src="/arrow.svg" alt="back arrow">
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
        </div>
        <div class="edit__wrapper">
          <div class="data-item">
            <a href="edit_data">Change information</a>
            <span></span>
          </div>
          <div class="data-item">
            <a href="edit_password">Change password</a>
            <span></span>
          </div>
          <div class="data-item">
            <a href="">Exit account</a>
          </div>
        </div>
      </div>
    </div>`;
