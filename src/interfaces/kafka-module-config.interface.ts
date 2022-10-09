import { SchemaRegistryAPIClientArgs } from '@kafkajs/confluent-schema-registry/dist/api';
import { KafkaConfig, ConsumerConfig, ProducerConfig } from 'kafkajs';
import { SchemaRegistryConfig } from '../types/index.type';

export interface KafkaModuleConfig {
  kafkaConfig: KafkaConfig;
  consumerConfig: ConsumerConfig;
  producerConfig?: ProducerConfig
  schemaRegistryConfig?: SchemaRegistryAPIClientArgs;
  // schemaRegistryConfig?: SchemaRegistryConfig;

  /**
   * Default true
   */
  autoParseJson?: boolean;

  /**
   * Default true
   */
  autoStringifyJson?: boolean;
}
