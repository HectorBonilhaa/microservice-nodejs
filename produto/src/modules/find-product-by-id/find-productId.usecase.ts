import { ProductRepository } from "../repositories/product-repository";

export class FindProductByIdUseCase {
  constructor() {}

  async execute(id: string) {
    const productRepository = new ProductRepository();

    const product = await productRepository.findById(id);

    return product;
  }
}
