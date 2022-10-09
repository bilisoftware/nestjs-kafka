import { SchemaRegistry } from '@kafkajs/confluent-schema-registry';
import { OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Producer, ProducerRecord } from 'kafkajs';
import { logService } from './log.service';

export class KafkaProducer implements OnModuleDestroy, OnModuleInit {
  constructor(
    private producer: Producer,
    private autoStringifyJson: boolean,
    private registry?: SchemaRegistry
  ) {}

  async send(record: ProducerRecord, schemaId?: number) {
    if (schemaId && this.registry) {
      record.messages = await Promise.all(
        record.messages.map(async (item) => {
          if (!this.registry) return item;

          item.value = await this.registry.encode(schemaId, item.value);
          return item;
        })
      );
    } else if (this.autoStringifyJson) {
      record.messages = record.messages.map((item) => {
        item.value = JSON.stringify(item.value);
        return item;
      });
    }

    return this.producer.send(record);
  }

  async onModuleInit() {
    await this.producer.connect();
    logService.producerConnected();
  }

  async onModuleDestroy() {
    await this.producer.disconnect();
    logService.producerDisconnected();
  }
}
