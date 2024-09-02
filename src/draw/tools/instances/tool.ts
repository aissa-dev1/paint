import { Ctx } from "../../../types";

export interface ToolConfig {
  ctx: Ctx;
}

export abstract class Tool {
  protected ctx: Ctx;
  protected _isDrawing = false;
  protected x: number | null = null;
  protected y: number | null = null;

  constructor(config: ToolConfig) {
    this.ctx = config.ctx;
  }

  draw() {}

  update() {}

  changeIsDrawing(isDrawing: boolean) {
    this._isDrawing = isDrawing;
  }

  changeX(x: number | null) {
    this.x = x;
  }

  changeY(y: number | null) {
    this.y = y;
  }

  get isDrawing(): boolean {
    return this._isDrawing;
  }
}
