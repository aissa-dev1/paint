import { ToolController } from "../controller/tool-controller";
import { Ctx } from "../types";
import { Board } from "../view/board";

interface PaintConfig {
  ctx: Ctx;
  board: Board;
}

export class Paint {
  private ctx: Ctx;
  private board: Board;
  private _toolController: ToolController;

  constructor(config: PaintConfig) {
    this.ctx = config.ctx;
    this.board = config.board;
    this._toolController = new ToolController({
      ctx: this.ctx,
      board: this.board,
    });
  }

  init() {
    this.board.init();
    this.toolController.init();
    this.animate();
  }

  private draw() {
    this.toolController.draw();
  }

  private update() {
    this.toolController.update();
  }

  private animate() {
    this.draw();
    this.update();
    requestAnimationFrame(() => this.animate());
  }

  get toolController(): ToolController {
    return this._toolController;
  }
}
