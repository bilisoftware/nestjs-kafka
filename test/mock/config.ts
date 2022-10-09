import { ConsumerConfig, KafkaConfig } from 'kafkajs';
import { SchemaRegistryConfig } from '../../src';

export const kafkaConfig: KafkaConfig = {
  clientId: 'my-app',
  brokers: ['pkc-ymrq7.us-east-2.aws.confluent.cloud:9092'],
  ssl: true,
  sasl: {
    mechanism: 'plain',
    username: 'GRP5KOJ5UHJJ4QOD',
    password:
      'nxEqdW7G+8MjM7UJQNN4KE1rDjXJJiDu4C5P4fNHgn4Md99daBUk2lTqQKqahNNg',
  },
  connectionTimeout: 99999,
};

export const consumerConfig: ConsumerConfig = {
  groupId: 'test',
  allowAutoTopicCreation: false,
};

export const schemaRegistryConfig: SchemaRegistryConfig = {
  host: 'https://psrc-zy38d.ap-southeast-1.aws.confluent.cloud',
  auth: {
    username: 'W2RLJAFPJQXNBTLU',
    password:
      'G3Tq42Hl7JgiHSZne2+TPft08U5T5B0uJsmyEJ6tXDI83oyQZZF9pFaji4xo4SAc',
  },
  schemaId: 10002,
};
