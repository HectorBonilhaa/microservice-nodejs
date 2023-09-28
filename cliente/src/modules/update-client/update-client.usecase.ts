import { Client } from "@prisma/client";
import { Request, Response } from "express";
import { ClientRepository } from "../repositories/client-repository";
import AppError from "../../errors/AppError";
import { prismaClient } from "../../infra/database/prismaClient";

interface UpdateClientRequest {
  id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
}

export class UpdateClientUseCase {
  constructor() {}

  async execute(data: UpdateClientRequest): Promise<Client | null> {
    const clientRepository = new ClientRepository();

    const existsClient = await clientRepository.findById(data.id);

    if (!existsClient)
      throw new AppError(`Customer with Id: ${data.id} not found`, 404);

    const existEmailCustomer = await clientRepository.findByEmail(data.email);

    if (existEmailCustomer && existEmailCustomer.id !== data.id) {
      throw new AppError(
        `This email: ${data.email} is already registered!`,
        400
      );
    }

    const updateCustomer = await prismaClient.client.update({
      where: {
        id: data.id,
      },
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
        phone: data.phone,
      },
    });

    return updateCustomer;
  }
}
