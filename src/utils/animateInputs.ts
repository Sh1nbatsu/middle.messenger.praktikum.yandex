// Не знал как назвать эту функцию, я посчитал нужным вынести всю эту логику в отдельный файл, что бы не перегружать index.ts, так как думаю что основное, что там должно быть - это роутер.

export default function aliveLogin() {
  const inputDivList = document.querySelectorAll("#input-div");

  inputDivList.forEach((inputDiv) => {
    const loginInput = inputDiv.querySelector("input")!;

    const topText = inputDiv.querySelector(".top__text");

    const bottomText = inputDiv.querySelector(".bottom__text") as HTMLElement;

    loginInput.addEventListener("input", () => {
      (topText as HTMLElement).style.transform = "translate(-8%, 0) scale(0.8)";
      if (!loginInput.value) {
        (topText as HTMLElement).style.transform = "translateY(20px)";
      }
    });

    loginInput.addEventListener("blur", () => {
      bottomText.style.opacity = "1";
      bottomText.style.transform = "translateY(0)";
      setTimeout(() => {
        bottomText.style.opacity = "0";
        bottomText.style.transform = "translateY(-18px)";
      }, 2000);
    });

    loginInput.addEventListener("focus", () => {
      bottomText.style.opacity = "0";
      bottomText.style.transform = "translateY(-18px)";
    });
  });
}
