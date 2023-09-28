import { ClientRepository } from "../repositories/client-repository";

export class ListClientsUseCase {
  constructor() {}

  async execute() {
    const clientRepository = new ClientRepository();
    const customer = await clientRepository.findAll();

    return customer;
  }
}
