import { SubscribeMetadataKey } from '../enums/subcribe-metadata-key.enum';

export const SubscribeTo = (topic: string) => {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    Reflect.defineMetadata(
      SubscribeMetadataKey.HANDLER,
      topic,
      target,
      propertyKey
    );
  };
};
