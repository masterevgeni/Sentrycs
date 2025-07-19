class MyActionListener {
  private actions: Record<string, Function[]>;

  constructor() {
    this.actions = {};
  }

  registerListener(action: string, listener: Function) {
    if (!this.actions[action]) {
      this.actions[action] = [];
    }
    this.actions[action].push(listener);
  }

  removeListener(action: string) {
    delete this.actions[action];
  }

  emit(action: string, data?: any) {
    if (!this.actions[action]) {
      throw new Error(`Can't emit an event. Event "${action}" doesn't exist.`);
    }
    this.actions[action].forEach(listener => listener(data));
  }
}

export { MyActionListener };