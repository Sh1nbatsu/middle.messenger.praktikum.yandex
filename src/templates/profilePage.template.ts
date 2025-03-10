export default `
    <div class="profile__wrapper">
      <div class="left-block">
        <a href="/im">
            <img src="/arrow.svg" alt="back arrow">
        </a>
      </div>
      <div class="main__wrapper">
        <div class="pfp__wrapper">
            <div>
              <img src="/mock_pfp1.jpg" alt="profile picture">
              <p>Change avatar</p>
            </div>
            <h2>John</h2>
        </div>
        <div class="data__wrapper">
          {{> userDataPartial desc="E-mail" data="mymail@mail.com"}}
          {{> userDataPartial desc="Login" data="John Doe"}}
          {{> userDataPartial desc="First name" data="John"}}
          {{> userDataPartial desc="Second name" data="Doe"}}
          {{> userDataPartial desc="Name in chat" data="Well, i guess"}}
          {{> userDataPartial desc="Phone" data="8 (800) 555 35 35"}}
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
