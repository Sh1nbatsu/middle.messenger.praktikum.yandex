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
          {{> editInputPartial inputDesc="Email" inputType="email" inputName="email"  errorMessage="Invalid email" placeholder="mymail@mail.com"}}
          {{> editInputPartial inputDesc="Login" inputType="text" inputName="login"  errorMessage="Invalid login" placeholder="John Doe"}}
          {{> editInputPartial inputDesc="First name" inputType="text" inputName="first_name"  errorMessage="Invalid first name" placeholder="John"}}
          {{> editInputPartial inputDesc="Second name" inputType="text" inputName="second_name"  errorMessage="Invalid second name" placeholder="Doe"}}
          {{> editInputPartial inputDesc="Name in chat" inputType="text" inputName="dislay_name"  errorMessage="Invalid name" placeholder="Well, i guess"}}
          {{> editInputPartial inputDesc="Phone number" inputType="tel" inputName="phone"  errorMessage="Invalid phone number" placeholder="8-800-555-35-35"}}
        </div>
        {{> mainButtonPartial buttonType="submit" buttonText="Submit"}}
      </form>
    </div>`;
