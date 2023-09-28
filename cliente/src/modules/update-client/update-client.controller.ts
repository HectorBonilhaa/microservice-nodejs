import { Request, Response } from "express";
import { prismaClient } from "../../infra/database/prismaClient";
import AppError from "../../errors/AppError";
import { UpdateClientUseCase } from "./update-client.usecase";

export class UpdateClientController {
  constructor() {}

  public async handle(request: Request, response: Response): Promise<Response> {
    try {
      const useCase = new UpdateClientUseCase();
      const { id } = request.params;
      const { name, email, password, phone } = request.body;

      const updateCustomer = await useCase.execute({
        id,
        name,
        email,
        password,
        phone,
      });

      return response.json(updateCustomer);
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
        status: "error",
        message: "Internal server error",
      });
    } finally {
      await prismaClient.$disconnect();
    }
  }
}
