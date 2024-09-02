import "./style.css";
import { Board } from "./view/board";
import { Canvas } from "./types";
import { Paint } from "./draw/paint";
import { FloatingToolsBar } from "./view/floating-tools-bar";
import { ToolSizeRange } from "./view/tool-size-range";

const app = document.querySelector<HTMLDivElement>("#app")!;
const canvas = document.querySelector<Canvas>("#main_canvas")!;
const ctx = canvas.getContext("2d")!;

const board = new Board({
  canvas,
  width: window.innerWidth,
  height: window.innerHeight,
});
const paint = new Paint({
  ctx,
  board,
});
const floatingToolsBar = new FloatingToolsBar({
  app,
  board,
});
const toolSizeRange = new ToolSizeRange({
  app,
});

document.addEventListener("DOMContentLoaded", () => {
  paint.init();
  floatingToolsBar.init();
  toolSizeRange.init();
});
