export default `
    <div class="login__container">
      <div class="login__wrapper">
        <h1>Sign In</h1>
        <form action="" class="login__form">
          <div class="input__wrapper">
            {{> loginInputPartial inputDesc="Login" inputType="text" inputName="login" errorMessage="Invalid login"}}
            {{> loginInputPartial inputDesc="Password" inputType="password" inputName="password" errorMessage="Invalid password"}}
          </div>
          {{> mainButtonPartial buttonType="submit" buttonText="Sign up"}}
        </form>
        <div class="register__link">
          <a href="signin">Create Account?</a>
        </div>
      </div>
    </div>`;
