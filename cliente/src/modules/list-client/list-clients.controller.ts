import { Request, Response } from "express";
import { prismaClient } from "../../infra/database/prismaClient";
import AppError from "../../errors/AppError";
import { ListClientsUseCase } from "./list-clients.usecase";
import { ClientRepository } from "../repositories/client-repository";

export class ListClientsController {
  constructor() {}

  public async handle(request: Request, response: Response): Promise<Response> {
    try {
      const useCase = new ListClientsUseCase();
      const clientRepository = new ClientRepository();

      const { name, email } = request.query;

      if (typeof name === "string") {
        const filteredClients = await clientRepository.findByName(name);
        return response.json(filteredClients);
      }

      if (typeof email === "string") {
        const filteredClients = await clientRepository.findByEmail(email);

        if (filteredClients === null) {
          // Se nenhum registro correspondente for encontrado, retorne um array vazio
          return response.json([]);
        }
        return response.json(filteredClients);
      }

      const customers = await useCase.execute();

      return response.json(customers);
    } catch (err) {
      console.error(err);

      // Verifica se o erro é uma instância de AppError
      if (err instanceof AppError) {
        return response.status(err.statusCode).json({
          status: err.statusCode,
          message: err.message,
        });
      }

      // Se não for uma instância de AppError, trata como um erro interno do servidor
      return response.status(500).json({
        status: "500",
        message: "Internal server error",
      });
    } finally {
      await prismaClient.$disconnect();
    }
  }
}
