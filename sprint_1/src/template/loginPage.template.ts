export default `<div class="login__container">
      <div class="login__wrapper">
        <h1>Sign In</h1>
        <form action="" class="login__form">
          <div class="input__wrapper">
            {{> loginInputPartial className="login" inputType="text" inputDesc="Login" errorMessage="Invalid login"}} 
            {{> loginInputPartial className="password" inputDesc="Password" inputType="password" errorMessage="Invalid password"}}
          </div>
          <button type="submit">Enter</button>
        </form>
        <div class="register__link">
          <a href="#">Create Account?</a>
        </div>
      </div>
    </div>`;
