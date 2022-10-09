import { ConsumerHandler } from '../interfaces/consumer-handler.interface';

export type SubcribeInfoType = Map<string, ConsumerHandler>;
export const subscribeInfos: SubcribeInfoType = new Map();
