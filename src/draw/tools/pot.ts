import { store } from "../../store";
import { Board } from "../../view/board";
import { StaticTool } from "./instances/static-tool";
import { ToolConfig } from "./instances/tool";

interface PotConfig extends ToolConfig {
  board: Board;
}

export class Pot extends StaticTool {
  private board: Board;

  constructor(config: PotConfig) {
    super({
      ctx: config.ctx,
    });
    this.board = config.board;
  }

  override draw() {
    if (!this.applied) return;

    this.ctx.fillStyle = store.state.brushFill;
    this.ctx.fillRect(0, 0, this.board.w, this.board.h);
    this.ctx.fill();
  }

  override update() {}
}
