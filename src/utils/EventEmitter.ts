export class EventEmitter {
  private listeners: {
    [key: string]: ((any) => void)[];
  } = {};

  emit(name: string, e: any): void {
    if (this.listeners[name]) {
      this.listeners[name].forEach((callback) => callback(e));
    }
  }

  addListener(name: string, callback: (any) => any): () => void {
    this.listeners[name] = this.listeners[name] || [];
    this.listeners[name].push(callback);
    return () =>
      this.listeners[name].splice(this.listeners[name].indexOf(callback), 1);
  }
}
