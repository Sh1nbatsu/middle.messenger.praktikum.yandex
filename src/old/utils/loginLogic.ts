import { validateLogin } from "./validation";

export default function loginLogic() {
  const form = document.querySelector("#login-form") as HTMLFormElement;

  const inputDivList = document.querySelectorAll("#input-div");

  const loginInputDiv = document
    .querySelector('div input[name="login"]')
    ?.closest("div");

  const passwordInputDiv = document
    .querySelector('div input[name="password"]')
    ?.closest("div");

  const loginInput = document.querySelector(
    'input[name="login"]'
  ) as HTMLInputElement;

  const passwordInput = document.querySelector(
    'input[name="password"]'
  ) as HTMLInputElement;

  inputDivList.forEach((inputDiv) => {
    const Input = inputDiv.querySelector("input")!;

    const topText = inputDiv.querySelector(".top__text");

    const bottomText = inputDiv.querySelector(".bottom__text") as HTMLElement;

    if (inputDiv === loginInputDiv) {
      Input.addEventListener("input", () => {
        (topText as HTMLElement).style.transform =
          "translate(-8%, 0) scale(0.8)";
        if (!Input.value) {
          (topText as HTMLElement).style.transform = "translateY(20px)";
        }
      });

      Input.addEventListener("blur", () => {
        if (!validateLogin(Input.value)) {
          bottomText.style.opacity = "1";
          bottomText.style.transform = "translateY(0)";
        }

        setTimeout(() => {
          bottomText.style.opacity = "0";
          bottomText.style.transform = "translateY(-18px)";
        }, 2000);
      });
    } else if (inputDiv === passwordInputDiv) {
      Input.addEventListener("input", () => {
        (topText as HTMLElement).style.transform =
          "translate(-8%, 0) scale(0.8)";
        if (!Input.value) {
          (topText as HTMLElement).style.transform = "translateY(20px)";
        }
      });
    }
  });

  loginInput.addEventListener("input", () => {
    if (loginInput.value) {
      console.log(loginInput.value);
    }

    console.log(validateLogin(loginInput.value));
  });

  passwordInput.addEventListener("input", () => {
    if (passwordInput.value) {
      console.log(passwordInput.value);
    }
  });

  form.addEventListener("submit", (event) => {
    if (!validateLogin(loginInput.value)) {
      event.preventDefault();
      return;
    }
    
    event.preventDefault();
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    console.log(data);
  });
}
