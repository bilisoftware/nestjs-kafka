import { OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Consumer, EachMessagePayload } from 'kafkajs';
import { SubcribeInfoType } from '../data';
import { SchemaRegistry } from '@kafkajs/confluent-schema-registry';
import { ModuleRef } from '@nestjs/core';
import { ConsumerHandler } from '../interfaces/consumer-handler.interface';
import { logService } from './log.service';

export class KafkaConsumer implements OnModuleDestroy, OnModuleInit {
  constructor(
    private consumer: Consumer,
    private subscribeInfos: SubcribeInfoType,
    private moduleRef: ModuleRef,
    private autoParseJson: boolean,
    private registry?: SchemaRegistry
  ) {}

  async onModuleInit() {
    await this.consumer.connect();

    if (!this.subscribeInfos.size) {
      logService.warnIfNotSubcribeAnyTopic();
      await this.consumer.disconnect();
      return;
    }

    await this.consumer.subscribe({
      topics: [...this.subscribeInfos.keys()],
      fromBeginning: false,
    });

    await this.consumer.run({
      eachMessage: async (payload: EachMessagePayload) => {
        if (payload.message.value) {
          if (this.registry) {
            payload.message.value = await this.registry.decode(
              payload.message.value
            );
          } else if (this.autoParseJson) {
            payload.message.value = await JSON.parse(
              payload.message.value.toString()
            );
          }
        }

        const subscribeInfo = this.subscribeInfos.get(
          payload.topic
        ) as ConsumerHandler;

        const contextInstance = await this.getContextInstance(
          subscribeInfo.context
        );

        await subscribeInfo.handler.call(contextInstance, payload);
      },
    });

    logService.subscribeToTopics(this.subscribeInfos.keys());
    logService.consumerListening();
  }

  async onModuleDestroy() {
    await this.consumer.disconnect();
    logService.consumerDisconnected();
  }

  private async getContextInstance(context: Function) {
    let instance = this.moduleRef.get(context, { strict: false });

    if (!instance) {
      instance = await this.moduleRef.create(instance);
      logService.warnIfContextHasNotBeenInstanced(context.name);
    }

    return instance;
  }
}
