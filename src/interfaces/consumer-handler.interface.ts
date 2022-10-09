export interface ConsumerHandler {
  topic: string;
  context: Function;
  handler: (...args: any[]) => any;
}
