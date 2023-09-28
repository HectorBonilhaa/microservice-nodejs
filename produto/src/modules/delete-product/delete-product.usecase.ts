import AppError from "../../errors/AppError";
import { ProductRepository } from "../repositories/product-repository";

export class DeleteProductUseCase {
  constructor() {}

  async execute(id: string): Promise<void> {
    const productRepository = new ProductRepository();

    const existsProducts = await productRepository.findById(id);

    if (!existsProducts) {
      throw new AppError(`Product with Id: ${id} not found`, 404);
    }

    await productRepository.deleteById(id);
  }
}
