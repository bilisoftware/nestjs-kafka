import { Logger } from '@nestjs/common';

export class LogService {
  logger = new Logger('KafakaModule');

  warnIfSubcribeTopicTwice(container: Map<string, any>, topic: string) {
    if (container.has(topic))
      this.logger.warn(`Listen twice of topic ${topic}`);
  }

  warnIfNotSubcribeAnyTopic() {
    this.logger.warn(`You did not subscribe to any topic, auto disconnect`);
  }

  warnIfContextHasNotBeenInstanced(name: string) {
    this.logger.warn(
      `Dependency ${name} has not been instantiated, auto instantiate it`
    );
  }

  subscribeToTopics(topics: Iterable<String>) {
    for (const topic of topics) {
      this.logger.log(`Subscribe to topic ${topic}`);
    }
  }

  consumerListening() {
    this.logger.log('Consumer is listening . . .');
  }

  consumerDisconnected() {
    this.logger.log('Consumer has disconnected successfully');
  }

  producerConnected() {
    this.logger.log('Producer is connected')
  }

  producerDisconnected() {
    this.logger.log('Producer has disconnected successfully');
  }
}

export const logService = new LogService();
