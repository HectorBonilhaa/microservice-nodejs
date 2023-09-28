import { Request, Response } from "express";
import { prismaClient } from "../../infra/database/prismaClient";
import AppError from "../../errors/AppError";
import { ProductRepository } from "../repositories/product-repository";
import { FindProductByIdUseCase } from "./find-productId.usecase";

export class FindProductIdController {
  constructor() {}

  public async handle(request: Request, response: Response): Promise<Response> {
    try {
      const useCase = new FindProductByIdUseCase();
      const { id } = request.params;

      const product = await useCase.execute(id);

      return response.json(product);
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
