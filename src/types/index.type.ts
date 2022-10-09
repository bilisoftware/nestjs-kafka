import { SchemaRegistryAPIClientArgs } from '@kafkajs/confluent-schema-registry/dist/api';

export type SchemaRegistryConfig = SchemaRegistryAPIClientArgs & {
  schemaId: number;
};
