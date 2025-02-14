export default `
    <div class="login__container">
      <div class="login__wrapper">
        <h1>Sign up</h1>
        <form action="" class="login__form">
          <div class="input__wrapper">
            {{> loginInputPartial inputType="email" inputDesc="Email" inputName="email" errorMessage="Invalid email"}} 
            {{> loginInputPartial inputType="text" inputDesc="Login" inputName="login" errorMessage="Invalid Login"}}
            {{> loginInputPartial inputType="text" inputDesc="First name" inputName="first_name" errorMessage="Invalid First name"}}
            {{> loginInputPartial inputType="text" inputDesc="Second name" inputName="second_name" errorMessage="Invalid Second name"}}
            {{> loginInputPartial inputType="phone" inputDesc="Phone number" inputName="phone" errorMessage="Invalid Phone number"}}
            {{> loginInputPartial inputType="password" inputDesc="Password" inputName="password" errorMessage="Password too short"}}
            {{> loginInputPartial inputType="password" inputDesc="Confirm password" inputName="password" errorMessage="Passwords dont match"}}
          </div>
          {{> mainButtonPartial buttonType="submit" buttonText="Sign up"}}
        </form>
        <div class="register__link">
          <a href="/">Enter?</a>
        </div>
      </div>
    </div>`;
