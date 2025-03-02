import { validateAll } from "../../utils/validation.ts";

export default function registerLogic() {
  const inputDivList = document.querySelectorAll("#input-div");

  const form = document.querySelector("#register-form") as HTMLFormElement;

  inputDivList.forEach((inputDiv) => {
    const input = inputDiv.querySelector("input")! as HTMLInputElement;

    const topText = inputDiv.querySelector(".top__text") as HTMLElement;

    const bottomText = inputDiv.querySelector(".bottom__text") as HTMLElement;

    input.addEventListener("input", () => {
      (topText as HTMLElement).style.transform = "translate(-8%, 0) scale(0.8)";
      if (!input.value) {
        (topText as HTMLElement).style.transform = "translateY(20px)";
      }
    });

    input.addEventListener("blur", () => {
      if (!validateAll(input).isPassed) {
        bottomText.style.opacity = "1";
        bottomText.style.transform = "translateY(0)";
        setTimeout(() => {
          bottomText.style.opacity = "0";
          bottomText.style.transform = "translateY(-18px)";
        }, 2000);
      }
    });

    input.addEventListener("focus", () => {
      bottomText.style.opacity = "0";
      bottomText.style.transform = "translateY(-18px)";
    });
  });

  form.addEventListener("submit", (event) => {
    let isValid = true;

    inputDivList.forEach((inputDiv) => {
      const input = inputDiv.querySelector("input")!;

      const bottomText = inputDiv.querySelector(".bottom__text") as HTMLElement;

      if (!validateAll(input).isPassed) {
        bottomText.style.opacity = "1";
        bottomText.style.transform = "translateY(0)";
        setTimeout(() => {
          bottomText.style.opacity = "0";
          bottomText.style.transform = "translateY(-18px)";
        }, 2000);
        isValid = false;
      }
    });

    if (!isValid) {
      event.preventDefault();
      return;
    } else {
      event.preventDefault();
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());
      console.log(data);
    }
  });
}

// Достаточно много думал о том, как это все можно сократить, как можно уменьшить повторения кода с инпутами, их анимациями, но не нашел нормального способа это сделать.
// Дефолтное поведение браузера не дает отправить форму если поле email заполнено некорректно, из за чего логика валидации инпутов внутри хендлера самбита формы не будет работать, если поле email заполнено некорректно. (насколько я это понял)
