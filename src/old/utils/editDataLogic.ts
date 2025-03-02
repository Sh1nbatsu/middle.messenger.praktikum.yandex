import { validateAll } from "../../utils/validation";

export default function editDataLogic() {
  const inputDivList = document.querySelectorAll("#input-div");

  const form = document.querySelector("#edit-form") as HTMLFormElement;

  inputDivList.forEach((inputDiv) => {
    const input = inputDiv.querySelector("input")! as HTMLInputElement;

    input.addEventListener("blur", () => {
      if (!validateAll(input).isPassed && input.value) {
        input.className = "error";
        input.style.color = "red";
        setTimeout(() => {
          input.className = "";
        }, 300);
      }
    });

    input.addEventListener("input", () => {
      input.style.color = "inherit";
    });
  });

  form.addEventListener("submit", (event) => {
    let isValid = true;
    let isEmpty = true;

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    for (const key in data) {
      const value = data[key];
      if (value) {
        isEmpty = false;
        break;
      }
    }

    if (isEmpty) {
      alert("Заполните хотя бы одно поле");
      // Пока оставлю alert, при надобности могу сделать popup снизу с ошибкой.
      event.preventDefault();
      return;
    }

    inputDivList.forEach((inputDiv) => {
      const input = inputDiv.querySelector("input")!;

      if (!validateAll(input).isPassed && input.value) {
        input.className = "error";
        input.style.color = "red";
        setTimeout(() => {
          input.className = "";
        }, 300);
        isValid = false;
      }
    });

    if (!isValid) {
      event.preventDefault();
      return;
    }

    console.log("форма отправляется", data);
    event.preventDefault();
  });
}

// Могут быть ошибки при работе анимации в зависимости от браузера, проверку на это если смогу - напишу позже.
