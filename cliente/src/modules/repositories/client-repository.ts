import { Client } from "@prisma/client";
import { prismaClient } from "../../infra/database/prismaClient";

export class ClientRepository {
  constructor() {}

  async findAll(): Promise<Client[] | null> {
    const clients = await prismaClient.client.findMany();

    // Oculte o valor do atributo password definindo-o como null em cada objeto do resultado
    const clientsWithoutPassword = clients.map((client) => ({
      ...client,
      password: "********",
    }));

    return clientsWithoutPassword;
  }

  async findById(id: string): Promise<Client | null> {
    const clientId = await prismaClient.client.findUnique({
      where: {
        id,
      },
    });

    return clientId;
  }

  async findByEmail(email: string): Promise<Client | any> {
    const clientEmail = await prismaClient.client.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        name: true,
        email: true,
        password: false,
        phone: true,
      },
    });

    return clientEmail;
  }

  async findByName(name: string): Promise<Client[] | any> {
    const productName = await prismaClient.client.findMany({
      where: {
        name,
      },
      select: {
        id: true,
        name: true,
        email: true,
        password: false,
        phone: true,
      },
    });

    return productName;
  }

  async deleteById(id: string): Promise<Client | null> {
    const deletedClient = await prismaClient.client.delete({
      where: {
        id,
      },
    });

    return deletedClient;
  }
}
