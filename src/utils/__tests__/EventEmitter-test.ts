import { EventEmitter } from "../EventEmitter";

describe("EventEmitter", () => {
  it.each([0, 1, 2])(
    "keeps other listeners after repeated cleanup of listener %i",
    (removedIndex) => {
      const emitter = new EventEmitter();
      const listeners = [jest.fn(), jest.fn(), jest.fn()];
      const subscriptions = listeners.map((listener) =>
        emitter.addListener("focus", listener)
      );

      subscriptions[removedIndex]();
      subscriptions[removedIndex]();
      subscriptions[removedIndex]();
      emitter.emit("focus", "screen");

      listeners.forEach((listener, index) => {
        expect(listener).toHaveBeenCalledTimes(index === removedIndex ? 0 : 1);
        if (index !== removedIndex) {
          expect(listener).toHaveBeenCalledWith("screen");
        }
      });
    }
  );

  it("keeps a later registration of the same callback", () => {
    const emitter = new EventEmitter();
    const listener = jest.fn();
    const unsubscribe = emitter.addListener("focus", listener);

    unsubscribe();
    const unsubscribeLater = emitter.addListener("focus", listener);
    unsubscribe();
    emitter.emit("focus", "screen");

    expect(listener).toHaveBeenCalledTimes(1);
    expect(listener).toHaveBeenCalledWith("screen");

    unsubscribeLater();
    emitter.emit("focus", "another screen");
    expect(listener).toHaveBeenCalledTimes(1);
  });

  it("removes duplicate callback subscriptions independently", () => {
    const emitter = new EventEmitter();
    const listener = jest.fn();
    const unsubscribeFirst = emitter.addListener("focus", listener);
    const unsubscribeSecond = emitter.addListener("focus", listener);

    unsubscribeFirst();
    unsubscribeFirst();
    emitter.emit("focus", "screen");
    expect(listener).toHaveBeenCalledTimes(1);

    unsubscribeSecond();
    unsubscribeSecond();
    emitter.emit("focus", "another screen");
    expect(listener).toHaveBeenCalledTimes(1);
  });

  it("keeps a different callback registered after cleanup", () => {
    const emitter = new EventEmitter();
    const removedListener = jest.fn();
    const laterListener = jest.fn();
    const unsubscribe = emitter.addListener("focus", removedListener);

    unsubscribe();
    emitter.addListener("focus", laterListener);
    unsubscribe();
    emitter.emit("focus", "screen");

    expect(removedListener).not.toHaveBeenCalled();
    expect(laterListener).toHaveBeenCalledWith("screen");
  });

  it("keeps callback order and permits duplicate registrations", () => {
    const emitter = new EventEmitter();
    const calls: string[] = [];
    const listener = (screen: string) => calls.push(screen);
    emitter.addListener("focus", listener);
    emitter.addListener("focus", () => calls.push("middle"));
    emitter.addListener("focus", listener);

    emitter.emit("focus", "screen");

    expect(calls).toEqual(["screen", "middle", "screen"]);
  });

  it("removes only the requested event subscription", () => {
    const emitter = new EventEmitter();
    const listener = jest.fn();
    const unsubscribeFocus = emitter.addListener("focus", listener);
    emitter.addListener("blur", listener);

    unsubscribeFocus();
    unsubscribeFocus();
    emitter.emit("focus", "focused screen");
    emitter.emit("blur", "blurred screen");

    expect(listener).toHaveBeenCalledTimes(1);
    expect(listener).toHaveBeenCalledWith("blurred screen");
  });
});
