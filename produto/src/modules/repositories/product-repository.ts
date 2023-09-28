import { Product } from "@prisma/client";
import { prismaClient } from "../../infra/database/prismaClient";

export class ProductRepository {
  constructor() {}

  async findAll(): Promise<Product[] | null> {
    const products = await prismaClient.product.findMany();

    return products;
  }

  async findById(id: string): Promise<Product | null | undefined> {
    const productId = await prismaClient.product.findUnique({
      where: {
        id,
      },
    });

    return productId;
  }
  async findByCode(code: string): Promise<Product | null> {
    const productCode = await prismaClient.product.findUnique({
      where: {
        code,
      },
    });

    return productCode;
  }

  async findByName(name: string): Promise<Product[] | null | undefined> {
    const productName = await prismaClient.product.findMany({
      where: {
        name: {
          contains: name,
        },
      },
    });

    return productName;
  }
  async findByCategory(
    category: string
  ): Promise<Product[] | null | undefined> {
    const productCategory = await prismaClient.product.findMany({
      where: {
        category: {
          contains: category,
        },
      },
    });

    return productCategory;
  }

  async deleteById(id: string): Promise<Product | null> {
    const deletedProduct = await prismaClient.product.delete({
      where: {
        id,
      },
    });

    return deletedProduct;
  }
}
