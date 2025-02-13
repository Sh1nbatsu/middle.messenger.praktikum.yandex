export default `
    <div class="profile__wrapper">
      <div class="left-block">
        <a href="/">
            <img src="../static/arrow.svg" alt="">
        </a>
      </div>
      <div class="main__wrapper">
        <div class="pfp__wrapper">
            <div>
              <img src="../static/mock_pfp1.jpg" alt="">
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
            <a href="">Change information</a>
            <span></span>
          </div>
          <div class="data-item">
            <a href="">Change password</a>
            <span></span>
          </div>
          <div class="data-item">
            <a href="">Exit account</a>
          </div>
        </div>
      </div>
    </div>
`;
