import { Request, Response } from "express";
import { prismaClient } from "../../infra/database/prismaClient";
import AppError from "../../errors/AppError";
import { ListProductUseCase } from "./list-products.usecase";
import { ProductRepository } from "../repositories/product-repository";

export class ListProductController {
  constructor() {}

  public async handle(request: Request, response: Response): Promise<Response> {
    try {
      const useCase = new ListProductUseCase();
      const productRepository = new ProductRepository();

      const { name, category, code } = request.query;

      if (typeof name === "string") {
        const filteredProducts = await productRepository.findByName(name);
        return response.json(filteredProducts);
      }

      if (typeof category === "string") {
        const filteredProducts = await productRepository.findByCategory(
          category
        );
        return response.json(filteredProducts);
      }

      if (typeof code === "string") {
        const filteredProducts = await productRepository.findByCode(code);

        if (filteredProducts === null) {
          // Se nenhum registro correspondente for encontrado, retorne um erro 404
          return response.json([]);
        }
        return response.json(filteredProducts);
      }

      const products = await useCase.execute();

      return response.json(products);
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
