import { store } from "../../store";
import { Board } from "../../view/board";
import { MovingTool } from "./instances/moving-tool";
import { ToolConfig } from "./instances/tool";

interface EraserConfig extends ToolConfig {
  board: Board;
}

export class Eraser extends MovingTool {
  private board: Board;
  private lastX: number | null = null;
  private lastY: number | null = null;

  constructor(config: EraserConfig) {
    super({
      ctx: config.ctx,
    });
    this.board = config.board;
  }

  override draw() {
    if (!this.isDrawing || this.x === null || this.y === null) return;

    this.ctx.beginPath();

    if (this.lastX !== null && this.lastY !== null) {
      this.ctx.moveTo(this.lastX, this.lastY);
      this.ctx.lineTo(this.x, this.y);
      this.ctx.strokeStyle = this.board.bg;
      this.ctx.lineWidth = store.state.toolSize;
      this.ctx.lineCap = "round";
      this.ctx.lineJoin = "round";
      this.ctx.stroke();
    }

    this.ctx.closePath();

    this.lastX = this.x;
    this.lastY = this.y;
  }

  override update() {
    if (!this.isDrawing) {
      this.lastX = null;
      this.lastY = null;
    }
  }
}
