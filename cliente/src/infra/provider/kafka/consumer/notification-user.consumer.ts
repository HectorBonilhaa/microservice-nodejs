import { KafkaConsumer } from "../kafka.consumer";

type CustomerConsumer = {
  customerId: string;
  status: string;
};

export async function createCustomerConsumer() {
  console.log("CUSTOMER CONSUMER");

  const consumer = await KafkaConsumer("ORDER_STATUS");
  await consumer.run({
    eachMessage: async ({ message }) => {
      const messageToString = message.value!.toString();
      const statusCostumer = JSON.parse(messageToString) as CustomerConsumer;

      // Enviar mensagem por email
      console.log(
        `ÁTUALIZAÇÃO DE STATUS - CLIENTE: ${statusCostumer.customerId} - STATUS: ${statusCostumer.status}`
      );
    },
  });
}

createCustomerConsumer();
