interface StoreState {
  toolSize: number;
  brushFill: string;
  tool: string;
  toolChanged: boolean;
}

class Store {
  private _state: StoreState = {
    toolSize: 10,
    brushFill: "#ffffff",
    tool: "brush",
    toolChanged: false,
  };

  setToolSize(size: number) {
    this._state.toolSize = size;
  }

  setBrushFill(fill: string) {
    this._state.brushFill = fill;
  }

  setTool(tool: string) {
    this._state.tool = tool;
  }

  setToolChanged(changed: boolean) {
    this._state.toolChanged = changed;
  }

  get state(): Readonly<StoreState> {
    return this._state;
  }
}

export const store = new Store();
