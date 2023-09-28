import { kafka } from ".";

export const KafkaConsumer = async (topic: string) => {
  const consumer = kafka.consumer({ groupId: "CUSTOMER_APP" });
  await consumer.connect();

  await consumer.subscribe({ topic, fromBeginning: true });

  return consumer;
};
