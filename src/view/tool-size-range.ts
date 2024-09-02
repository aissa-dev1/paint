import { store } from "../store";
import { createStyle } from "../utils/create-style";
import { createDiv, createInput, createParagraph } from "../utils/dom";

interface ToolSizeRangeConfig {
  app: HTMLDivElement;
}

export class ToolSizeRange {
  private app: HTMLDivElement;
  private container = createDiv();

  constructor(config: ToolSizeRangeConfig) {
    this.app = config.app;
  }

  init() {
    this.styleContainer();
    this.setupRangeInput();

    this.app.appendChild(this.container);
  }

  private setupRangeInput() {
    const rangeInput = createInput("range");
    const rangeElm = createParagraph("");

    createStyle(rangeInput, {
      position: "absolute",
      bottom: "70px",
      left: "-47px",
      transform: "rotate(270deg)",
    });
    createStyle(rangeElm, {
      position: "absolute",
      top: "0",
      left: "50%",
      transform: "translate(-50%)",
    });

    rangeInput.value = store.state.toolSize.toString();
    rangeInput.min = "5";
    rangeInput.max = "50";
    rangeElm.textContent = store.state.toolSize.toString();

    rangeInput.addEventListener("input", () => {
      store.setToolSize(parseInt(rangeInput.value));
      rangeElm.textContent = store.state.toolSize.toString();
    });

    this.container.append(rangeElm, rangeInput);
  }

  private styleContainer() {
    createStyle(this.container, {
      position: "absolute",
      left: "20px",
      top: "50%",
      transform: "translateY(-50%)",
      width: "35px",
      height: "200px",
      backgroundColor: "#fff",
      border: "1px solid #1a1d22",
      borderRadius: "6px",
    });
  }
}
