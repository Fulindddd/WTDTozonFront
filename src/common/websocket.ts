const DEFAULT_HEART_BEAT_TIME = 30000;
const DEFAULT_PING_MSG = 'ping';
const DEFAULT_PONG_MSG = 'pong';

type Options = {
  intervalTime?: number;
  pingMsg?: string;
  pongMsg?: string;
  needHeartBeat?: boolean;
  url: string;
};

type EventName = 'open' | 'close' | 'message' | 'error';
type Callback = (...args: Array<unknown>) => void;
type EventItem = {
  eventName: EventName;
  callback: Callback;
};

function parseSocketData(event: MessageEvent, pongMsg: string): string {
  let result = '';
  if (event && event.data) {
    const { data } = event;
    if (data !== pongMsg && data !== '') {
      try {
        result = JSON.parse(data);
      } catch (error) {
        window.console.error('JSON parse error', error);
        result = 'error';
        // throw new Error(`Error in websocket-server.js. JSON.parse error.`);
      }
    }
    return result;
  }
  return '';
}

function testEventName(name: string): boolean {
  const reg = /^open$|^close$|^message$|^error$/;
  return reg.test(name);
}
export default class WSocket {
  private socketInstance: WebSocket | null;

  private timer: NodeJS.Timeout | null;

  private intervalTime: Options['intervalTime'];

  private options: Options | undefined;

  private pingMsg: Options['pingMsg'];

  private pongMsg: Options['pongMsg'];

  private needHeartBeat: Options['needHeartBeat'];

  private url: string | undefined;

  private eventObject: { [key: string]: EventItem };

  constructor(options: Options | undefined) {
    this.socketInstance = null;
    this.eventObject = {};
    this.timer = null ;
    this.intervalTime = options && options.intervalTime ? options.intervalTime : DEFAULT_HEART_BEAT_TIME;
    this.pingMsg = options && options.pingMsg ? options.pingMsg : DEFAULT_PING_MSG;
    this.pongMsg = options && options.pongMsg ? options.pongMsg : DEFAULT_PONG_MSG;
    this.options = options;
    this.needHeartBeat = options && options.needHeartBeat;
    this.url = options && options.url;
    this.initSocketInstance();
  }

  // 心跳代码
  private creatHeartBeat(): void {
    this.timer = setTimeout(() => {
      this.sendMessage(this.pingMsg);
    }, this.intervalTime);
  }

  private closeHeartBeat(): void {
    if(this.timer) clearTimeout(this.timer);
    this.timer = null;
  }

  private resetHeartBeat(): void {
    this.closeHeartBeat();
    this.creatHeartBeat();
  }

  // ws代码
  public initSocketInstance(): void {
    if (!('WebSocket' in window)) {
      throw new Error('Websocket is not supported in your browser');
    }
    if (this.url) {
      const socket = new WebSocket(this.url);
      this.socketInstance = socket;
      socket.addEventListener('open', () => {
        if (this.needHeartBeat) {
          this.creatHeartBeat();
        }
        this.eventArrayHandler('open');
      });
      socket.addEventListener('message', (event: MessageEvent) => {
        this.receiveMessage(event);
      });
    }
  }

  private eventArrayHandler(eventName: EventName, data?: any): void {
    for (const key in this.eventObject) {
      if (Object.prototype.hasOwnProperty.call(this.eventObject, key)) {
        const element = this.eventObject[key];
        if (element.eventName === eventName) {
          element.callback(data);
        }
      }
    }
  }

  public addEventForSocketInstance(eventName: EventName, key: string, callback: Callback): void {
    const socket = this.socketInstance;
    if (socket && testEventName(eventName)) {
      this.eventObject[key] = { eventName, callback };
    }
  }

  public removeEventForSocketInstance(key: string): void {
    delete this.eventObject[key];
  }

  public closeSocket(): void {
    const socket = this.socketInstance;
    if (this.needHeartBeat) {
      this.closeHeartBeat();
    }
    if (socket && socket.close) {
      socket.close();
    }
    this.socketInstance = null;
  }

  public sendMessage<T>(msg: T): void {
    const socket = this.socketInstance;
    if (socket && socket.readyState === WebSocket.OPEN) {
      if (typeof msg === 'string') {
        socket.send(msg);
      } else {
        socket.send(JSON.stringify(msg));
      }
      if (this.needHeartBeat) {
        this.resetHeartBeat();
      }
    }
  }

  public receiveMessage(event: MessageEvent): void {
   if(this.pongMsg) 
    {
      const data = parseSocketData(event, this.pongMsg);
      if (data !== 'error') {
        this.eventArrayHandler('message', data);
      }
      if (this.needHeartBeat) {
        this.resetHeartBeat();
      }
    }
  }
}
