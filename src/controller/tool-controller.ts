import { Brush } from "../draw/tools/brush";
import { Eraser } from "../draw/tools/eraser";
import { Tool } from "../draw/tools/instances/tool";
import { store } from "../store";
import { Canvas, Ctx } from "../types";
import { Board } from "../view/board";
import { Pot } from "../draw/tools/pot";
import { StaticTool } from "../draw/tools/instances/static-tool";

interface ToolControllerConfig {
  ctx: Ctx;
  board: Board;
}

export class ToolController {
  private ctx: Ctx;
  private board: Board;
  private canvas: Canvas;
  private current: Tool | null = null;

  constructor(config: ToolControllerConfig) {
    this.ctx = config.ctx;
    this.board = config.board;
    this.canvas = this.ctx.canvas;
  }

  init() {
    this.changeTool(
      new Brush({
        ctx: this.ctx,
      })
    );
    this.canvas.addEventListener("mousedown", (e) => {
      this.handleMouseDown(e);
    });
    this.canvas.addEventListener("mousemove", (e) => {
      this.handleMouseMove(e);
    });
    this.canvas.addEventListener("mouseup", () => {
      this.handleMouseUp();
    });
    document.addEventListener("mouseup", () => {
      this.handleMouseUp();
    });
  }

  draw() {
    if (!this.current) return;

    this.current.draw();
  }

  update() {
    if (!this.current) return;

    this.current.update();
    this.updateTool();
  }

  changeTool(tool: Tool | null) {
    this.current = tool;
  }

  private updateTool() {
    if (!store.state.toolChanged) return;
    if (store.state.tool === "brush") {
      this.changeTool(
        new Brush({
          ctx: this.ctx,
        })
      );
    }
    if (store.state.tool === "eraser") {
      this.changeTool(
        new Eraser({
          ctx: this.ctx,
          board: this.board,
        })
      );
    }
    if (store.state.tool === "pot") {
      this.changeTool(
        new Pot({
          ctx: this.ctx,
          board: this.board,
        })
      );
    }
  }

  private handleMouseDown(e: MouseEvent) {
    if (!this.current || !this.mustMouseLeftBtn(e)) return;

    this.current.changeIsDrawing(true);
    this.current.changeX(e.offsetX);
    this.current.changeY(e.offsetY);

    if (this.current instanceof StaticTool) {
      this.current.setApplied(true);
    }
  }

  private handleMouseMove(e: MouseEvent) {
    if (!this.current || !this.current.isDrawing) return;

    this.current.changeX(e.offsetX);
    this.current.changeY(e.offsetY);
  }

  private handleMouseUp() {
    if (!this.current) return;

    this.current.changeIsDrawing(false);
    this.current.changeX(null);
    this.current.changeY(null);

    if (this.current instanceof StaticTool) {
      this.current.setApplied(false);
    }
  }

  private mustMouseLeftBtn(e: MouseEvent): boolean {
    return e.button === 0;
  }
}
