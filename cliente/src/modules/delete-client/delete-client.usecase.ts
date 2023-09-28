import { Client } from "@prisma/client";
import AppError from "../../errors/AppError";
import { ClientRepository } from "../repositories/client-repository";

export class DeleteClientsUseCase {
  constructor() {}

  async execute(id: string): Promise<Client | null> {
    const clientRepository = new ClientRepository();

    const existsCustomer = await clientRepository.findById(id);

    if (!existsCustomer)
      throw new AppError(`Product with Id: ${id} not found`, 404);

    const customer = await clientRepository.deleteById(id);

    return customer;
  }
}
