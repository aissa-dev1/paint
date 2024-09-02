import { Tool, ToolConfig } from "./tool";

export class StaticTool extends Tool {
  private _applied = false;

  constructor(config: ToolConfig) {
    super(config);
  }

  setApplied(applied: boolean) {
    this._applied = applied;
  }

  get applied(): boolean {
    return this._applied;
  }
}
