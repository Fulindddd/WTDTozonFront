const EVENT_CACHE = Symbol('eventCache');

type Callback = (...args: unknown[]) => void;

export default class E2 {
  constructor() {
    this[EVENT_CACHE] = Object.create(null);
  }

  public on(eventName: string, callBack: Callback): void {
    if (eventName && typeof eventName === 'string' && typeof callBack === 'function') {
      if (!this[EVENT_CACHE][eventName]) this[EVENT_CACHE][eventName] = [];
      this[EVENT_CACHE][eventName].push(callBack);
    }
  }

  public emit(eventName: string, ...args: any[]): void {
    if (eventName && typeof eventName === 'string') {
      if (!this[EVENT_CACHE][eventName]) this[EVENT_CACHE][eventName] = [];
      this[EVENT_CACHE][eventName].forEach((callBack: { apply: (arg0: null, arg1: any[]) => void; }) => {
        // eslint-disable-next-line prefer-spread
        callBack.apply(null, args);
      });
    }
  }

  public off(eventName: string, callBack: Callback): void {
    if (eventName && typeof eventName === 'string') {
      if (!this[EVENT_CACHE][eventName]) this[EVENT_CACHE][eventName] = [];
      if (callBack && typeof callBack === 'function') {
        this[EVENT_CACHE][eventName] = this[EVENT_CACHE][eventName].filter((item: Callback) => {
          return callBack !== item;
        });
      } else {
        this[EVENT_CACHE][eventName] = [];
      }
    }
  }

  public destroy(): void {
    this[EVENT_CACHE] = Object.create(null);
  }
}
