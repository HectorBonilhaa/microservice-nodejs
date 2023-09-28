import { Request, Response } from "express";
import { prismaClient } from "../../infra/database/prismaClient";
import AppError from "../../errors/AppError";
import { UpdateProductUseCase } from "./update-products.usecase";

export class UpdateProductController {
  constructor() {}

  public async handle(request: Request, response: Response): Promise<Response> {
    try {
      const useCase = new UpdateProductUseCase();
      const { id } = request.params;
      const { name, description, category, code, quantity, price } =
        request.body;

      const updatedProduct = await useCase.execute({
        id,
        name,
        description,
        category,
        code,
        quantity,
        price,
      });

      return response.json(updatedProduct);
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
