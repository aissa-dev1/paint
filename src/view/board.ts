import { store } from "../store";
import { Canvas } from "../types";
import { createStyle } from "../utils/create-style";

export type BoardTheme = "light" | "dark";

interface Config {
  canvas: Canvas;
  width: number;
  height: number;
}

export class Board {
  private canvas: Canvas;
  private _w: number;
  private _h: number;
  private _bg = "#1a1d22";
  private _theme: BoardTheme = "dark";

  constructor(config: Config) {
    this.canvas = config.canvas;
    this._w = config.width;
    this._h = config.height;
  }

  init() {
    this.canvas.width = this.w;
    this.canvas.height = this.h;
    this.styleBoard();
    this.handleThemeChange();
  }

  changeTheme(theme: BoardTheme) {
    this._theme = theme;
    this.handleThemeChange();

    const brushFillInput =
      document.querySelector<HTMLInputElement>("#brush_fill_input")!;

    if (!brushFillInput) return;

    brushFillInput.value = store.state.brushFill;
    this.canvas.getContext("2d")!.clearRect(0, 0, this.w, this.h);
  }

  private handleThemeChange() {
    if (this.theme === "light") {
      this.changeBg("#ffffff");
      store.setBrushFill("#1a1d22");
    } else {
      this.changeBg("#1a1d22");
      store.setBrushFill("#ffffff");
    }
  }

  private changeBg(bg: string) {
    this._bg = bg;
    createStyle(this.canvas, {
      backgroundColor: this.bg,
    });
  }

  private styleBoard() {
    createStyle(this.canvas, {
      backgroundColor: this.bg,
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    });
  }

  get w(): number {
    return this._w;
  }

  get h(): number {
    return this._h;
  }

  get bg(): string {
    return this._bg;
  }

  get theme(): BoardTheme {
    return this._theme;
  }
}
