import Block from "./Block";

export default function renderDOM(block: Block): HTMLElement {
  const root = document.querySelector("#root");
  if (!root) {
    throw new Error(`Root element not found for selector: #root`);
  }
  root.innerHTML = "";
  root.appendChild(block.getContent());
  block.dispatchComponentDidMount();
  console.log("render");
  return root as HTMLElement;
}
