import {
  createDiv,
  createInput,
  createSelect,
  createSelectOption,
  createSpan,
} from "../utils/dom";
import { createStyle } from "../utils/create-style";
import { Board, BoardTheme } from "./board";
import { store } from "../store";

interface FloatingToolsBarConfig {
  app: HTMLDivElement;
  board: Board;
}

export class FloatingToolsBar {
  private app: HTMLDivElement;
  private board: Board;
  private container = createDiv();
  private canvasBgContainer = createDiv();
  private brushFillContainer = createDiv();
  private toolContainer = createDiv();

  constructor(config: FloatingToolsBarConfig) {
    this.app = config.app;
    this.board = config.board;
  }

  init() {
    this.styleContainer();
    this.setupCanvasBgContainer();
    this.setupBrushFillContainer();
    this.setupToolContainer();

    this.container.append(
      this.canvasBgContainer,
      this.brushFillContainer,
      this.toolContainer
    );
    this.app.appendChild(this.container);
  }

  private setupCanvasBgContainer() {
    const label = createSpan("Board theme");
    const select = createSelect();
    const lightOption = createSelectOption("light", "Light");
    const darkOption = createSelectOption("dark", "Dark");

    createStyle(this.canvasBgContainer, {
      display: "flex",
      flexDirection: "column",
      gap: "6px",
      alignItems: "center",
      justifyContent: "center",
    });
    createStyle(label, {
      fontSize: "15px",
      fontWeight: "600",
    });

    select.append(lightOption, darkOption);

    select.value = this.board.theme;

    select.addEventListener("change", () => {
      this.board.changeTheme(select.value as BoardTheme);
    });

    this.canvasBgContainer.append(label, select);
  }

  private setupBrushFillContainer() {
    const label = createSpan("Brush fill");
    const input = createInput("color");

    input.setAttribute("id", "brush_fill_input");

    createStyle(this.brushFillContainer, {
      display: "flex",
      flexDirection: "column",
      gap: "6px",
      alignItems: "center",
      justifyContent: "center",
    });
    createStyle(label, {
      fontSize: "15px",
      fontWeight: "600",
    });

    input.value = store.state.brushFill;

    input.addEventListener("change", () => {
      store.setBrushFill(input.value);
    });

    this.brushFillContainer.append(label, input);
  }

  private setupToolContainer() {
    const label = createSpan("Tool");
    const select = createSelect();
    const brushOption = createSelectOption("brush", "Brush");
    const eraserOption = createSelectOption("eraser", "Eraser");
    const potOption = createSelectOption("pot", "Pot");

    createStyle(this.toolContainer, {
      display: "flex",
      flexDirection: "column",
      gap: "6px",
      alignItems: "center",
      justifyContent: "center",
    });
    createStyle(label, {
      fontSize: "15px",
      fontWeight: "600",
    });

    select.append(brushOption, eraserOption, potOption);

    select.value = store.state.tool;

    select.addEventListener("change", () => {
      store.setToolChanged(true);
      store.setTool(select.value);
      setTimeout(() => {
        store.setToolChanged(false);
      }, 50);
    });

    this.toolContainer.append(label, select);
  }

  private styleContainer() {
    createStyle(this.container, {
      backgroundColor: "#fff",
      display: "flex",
      gap: "10px",
      position: "absolute",
      top: "15px",
      left: "50%",
      transform: "translateX(-50%)",
      padding: "5px 10px",
      borderRadius: "6px",
      border: "1px solid #1a1d22",
    });
  }
}
