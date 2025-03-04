export default `
    <div class="login__container">
      <div class="login__wrapper">
        <h1>Sign In</h1>
        <form action="" class="login__form" id="login-form">
          <div class="input__wrapper">
            {{{ loginInput }}}
            {{{ passwordInput }}}
          </div>
            {{{ mainButton }}}
        </form>
        <div class="register__link">
          <a href="signup">Create Account?</a>
        </div>
      </div>
    </div>`;
