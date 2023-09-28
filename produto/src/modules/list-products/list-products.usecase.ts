import { ProductRepository } from "../repositories/product-repository";

export class ListProductUseCase {
  constructor() {}

  async execute() {
    const productRepository = new ProductRepository();

    const products = await productRepository.findAll();

    return products;
  }
}
