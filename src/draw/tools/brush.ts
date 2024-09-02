import { store } from "../../store";
import { MovingTool } from "./instances/moving-tool";
import { ToolConfig } from "./instances/tool";

export class Brush extends MovingTool {
  private lastX: number | null = null;
  private lastY: number | null = null;

  constructor(config: ToolConfig) {
    super(config);
  }

  override draw() {
    if (!this.isDrawing || this.x === null || this.y === null) return;

    this.ctx.beginPath();

    if (this.lastX !== null && this.lastY !== null) {
      this.ctx.moveTo(this.lastX, this.lastY);
      this.ctx.lineTo(this.x, this.y);
      this.ctx.strokeStyle = store.state.brushFill;
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
