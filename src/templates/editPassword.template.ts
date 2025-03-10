export default `
    <div class="profile__wrapper">
      <div class="left-block">
        <a href="/im">
            <img src="/arrow.svg" alt="back arrow">
        </a>
      </div>
      <form class="main__wrapper">
        <div class="pfp__wrapper">
          <div>
            <img src="/mock_pfp1.jpg" alt="profile picture">
            <p>Change avatar</p>
          </div>
          <h2>John</h2>
        </div>
        <div class="data__wrapper">
          {{> editInputPartial inputDesc="Old password" inputType="password" inputName="oldPassword"  errorMessage="Invalid password"}}
          {{> editInputPartial inputDesc="New password" inputType="password" inputName="newPassword"  errorMessage="Invalid password"}}
          {{> editInputPartial inputDesc="Confirm password" inputType="password" inputName="newPassword"  errorMessage="Passwords don't match"}}
        </div>
        {{> mainButtonPartial buttonType="submit" buttonText="Submit"}}
      </form>
    </div>`;
