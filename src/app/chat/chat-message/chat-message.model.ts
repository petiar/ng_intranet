export class ChatMessage {
  public name: string;
  public message: string;
  public timestamp: string;

  constructor(name: string,
              message: string,
              timestamp: string,
  ) {
    this.name = name;
    this.message = message;
    this.timestamp = timestamp;
  }
}
