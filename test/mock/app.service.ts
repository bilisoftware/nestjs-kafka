import { Inject, Injectable } from '@nestjs/common';
import { EachMessagePayload } from 'kafkajs';
import { KafkaListener, SubscribeTo } from '../../src';
import { KafkaProducer } from '../../src/services/producer.service';

@Injectable()
@KafkaListener()
export class AppService {
  constructor(
    private kafkaProducer: KafkaProducer,
    @Inject('TEST') private testFn: Function
  ) {}

  @SubscribeTo('topic_0')
  async test(payload: EachMessagePayload) {
    console.log('receive topic 1');
    console.log('payload', payload);
    console.log('this', this);
    this.testFn();
  }

  async sendMessage() {
    await this.kafkaProducer.send({
      topic: 'topic_0',
      messages: [{ value: 'test message' }],
    });
    this.testFn();
  }
}
