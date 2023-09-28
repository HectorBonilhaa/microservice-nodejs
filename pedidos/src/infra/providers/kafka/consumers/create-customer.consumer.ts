import { prismaClient } from "../../../database/prismaClient";
import { KafkaConsumer } from "../kafka.consumer";

type CustomerConsumer = {
  id: string;
  name: string;
  email: string;
};

export async function createCustomerConsumer() {
  console.log("CUSTOMER CONSUMER");

  const consumer = await KafkaConsumer("CUSTOMER_CREATED");
  await consumer.run({
    eachMessage: async ({ message }) => {
      const messageToString = message.value!.toString();
      const customer = JSON.parse(messageToString) as CustomerConsumer;

      await prismaClient.customer.create({
        data: {
          externalId: customer.id,
          name: customer.name,
          email: customer.email,
        },
      });
    },
  });
}

createCustomerConsumer();
