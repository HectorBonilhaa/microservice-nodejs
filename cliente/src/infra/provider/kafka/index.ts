import { Kafka } from "kafkajs";

const kafka = new Kafka({
  brokers: ["vital-mouse-11484-us1-kafka.upstash.io:9092"],
  sasl: {
    mechanism: "scram-sha-256",
    username: "dml0YWwtbW91c2UtMTE0ODQksKi85SeavACpLY6bBfCWqUWj1TyjWQTMVCrRjpg",
    password: "ZDI0YWFmODItNGYwMy00MzJkLThjYTQtNDg4NzNkNjc4Zjdm",
  },
  ssl: true,
});

export { kafka };
