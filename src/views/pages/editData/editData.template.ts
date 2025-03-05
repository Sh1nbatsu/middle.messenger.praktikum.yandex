export default `
    <div class="profile__wrapper">
      <div class="left-block">
        <a href="/im">
            <img src="/arrow.svg" alt="back arrow">
        </a>
      </div>
      <form class="main__wrapper" id="edit-form">
          {{{ pfpBlock }}}
        <div class="data__wrapper">
          {{{ emailInput}}}
          {{{ loginInput }}}
          {{{ firstNameInput }}}
          {{{ secondNameInput }}}
          {{{ displayNameInput }}}
          {{{ phoneNumberInput }}}
          </div>
        {{{ mainButton }}}
      </form>
    </div>`;
