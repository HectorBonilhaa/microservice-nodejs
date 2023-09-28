import { prismaClient } from "../../../database/prismaClient";
import { KafkaConsumer } from "../kafka.consumer";

type ProductConsumer = {
  id: string;
  code: string;
  name: string;
  category: string;
};

export async function createProductConsumer() {
  const consumer = await KafkaConsumer("PRODUCT_CREATED");
  await consumer.run({
    eachMessage: async ({ message }) => {
      const messageToString = message.value!.toString();
      const product = JSON.parse(messageToString) as ProductConsumer;

      await prismaClient.product.create({
        data: {
          externalId: product.id,
          code: product.code,
          name: product.name,
          category: product.category,
        },
      });
    },
  });
}

createProductConsumer();
