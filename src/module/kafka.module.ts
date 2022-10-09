import { DynamicModule, Module } from '@nestjs/common';
import { KafkaModuleConfig } from '../interfaces/kafka-module-config.interface';
import { Kafka, KafkaConfig, ConsumerConfig } from 'kafkajs';
import { SchemaRegistry } from '@kafkajs/confluent-schema-registry';
import { KafkaConsumer } from '../services/consumer.service';
import { ModuleRef } from '@nestjs/core';
import { subscribeInfos } from '../data';
import { KafkaProducer } from '../services/producer.service';

@Module({})
export class KafkaModule {
  static async registerRoot({
    kafkaConfig,
    consumerConfig,
    producerConfig,
    schemaRegistryConfig,
    autoParseJson = true,
    autoStringifyJson = true,
  }: KafkaModuleConfig): Promise<DynamicModule> {
    const kafka = new Kafka(kafkaConfig);
    const consumer = kafka.consumer(consumerConfig);
    const producer = kafka.producer(producerConfig);
    let registry: SchemaRegistry | undefined = undefined;

    if (schemaRegistryConfig) {
      registry = new SchemaRegistry(schemaRegistryConfig);
    }

    return {
      global: true,
      module: KafkaModule,
      providers: [
        {
          provide: KafkaConsumer,
          inject: [ModuleRef],
          useFactory: (moduleRef: ModuleRef) => {
            return new KafkaConsumer(
              consumer,
              subscribeInfos,
              moduleRef,
              autoParseJson,
              registry
            );
          },
        },
        {
          provide: KafkaProducer,
          useFactory: () => {
            return new KafkaProducer(producer, autoStringifyJson, registry);
          },
        },
      ],
      exports: [KafkaProducer],
    };
  }
}
