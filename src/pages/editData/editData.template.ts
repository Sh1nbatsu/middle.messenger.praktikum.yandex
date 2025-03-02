export default `
    <div class="profile__wrapper">
      <div class="left-block">
        <a href="/im">
            <img src="/arrow.svg" alt="back arrow">
        </a>
      </div>
      <form class="main__wrapper" id="edit-form">
        <div class="pfp__wrapper">
          <div>
            <img src="/mock_pfp1.jpg" alt="profile picture">
            <p>Change avatar</p>
          </div>
          <h2>John</h2>
        </div>
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
