import { subscribeInfos } from '../data';
import { SubscribeMetadataKey } from '../enums/subcribe-metadata-key.enum';
import { logService } from '../services/log.service';

export function KafkaListener() {
  return (constructor: Function) => {
    const target = constructor.prototype;

    for (const key of Object.getOwnPropertyNames(target)) {
      const topic: string | undefined = Reflect.getMetadata(
        SubscribeMetadataKey.HANDLER,
        target,
        key
      );

      if (!topic) continue;

      logService.warnIfSubcribeTopicTwice(subscribeInfos, topic);

      subscribeInfos.set(topic, {
        context: constructor,
        handler: target[key],
        topic,
      });
    }
  };
}
