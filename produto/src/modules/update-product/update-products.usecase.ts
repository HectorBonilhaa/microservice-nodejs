import { Product } from "@prisma/client";
import AppError from "../../errors/AppError";
import { ProductRepository } from "../repositories/product-repository";
import { prismaClient } from "../../infra/database/prismaClient";

type UpdateProductRequest = {
  id: string;
  name: string;
  description: string;
  category: string;
  code: string;
  quantity: number;
  price: number;
};
export class UpdateProductUseCase {
  constructor() {}

  async execute(data: UpdateProductRequest): Promise<Product | null> {
    const productRepository = new ProductRepository();

    const existsProducts = await productRepository.findById(data.id);

    if (!existsProducts) {
      throw new AppError(`Product with Id: ${data.id} not found`, 404);
    }

    const productCodeExistent = await productRepository.findByCode(data.code);

    if (productCodeExistent && productCodeExistent.id !== data.id) {
      throw new AppError(
        `This code: ${data.code} is from another product`,
        400
      );
    }

    const updateProduct = await prismaClient.product.update({
      where: {
        id: data.id,
      },
      data: {
        name: data.name,
        category: data.category,
        code: data.code,
        quantity: data.quantity,
        price: data.price,
      },
    });

    return updateProduct;
  }
}
