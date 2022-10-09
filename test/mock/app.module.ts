import { Module } from '@nestjs/common';
import { KafkaModule } from '../../src';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { consumerConfig, kafkaConfig, schemaRegistryConfig } from './config';

@Module({
  imports: [
    KafkaModule.registerRoot({
      kafkaConfig,
      consumerConfig,
      schemaRegistryConfig: undefined,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, { provide: 'TEST', useValue: Function() }],
})
export class AppModule {}
