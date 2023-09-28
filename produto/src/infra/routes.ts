import { Router, request, response } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import { CreateProductController } from "../modules/create-product/create-product.controller";
import { ListProductController } from "../modules/list-products/list-product.controller";
import { DeleteProductController } from "../modules/delete-product/delete-product.controller";
import { UpdateProductController } from "../modules/update-product/update-product.controller";
import { FindProductIdController } from "../modules/find-product-by-id/find-productId.controller";

const router = Router();

router.post(
  "/products",
  celebrate(
    {
      [Segments.BODY]: {
        name: Joi.string().required(),
        description: Joi.string().required(),
        category: Joi.string().required().max(30),
        code: Joi.string().required(),
        quantity: Joi.number().required(),
        price: Joi.number().precision(2).required(),
      },
    },
    { abortEarly: false }
  ),

  (request, response) => {
    new CreateProductController().handle(request, response);
  }
);

router.get("/products", (request, response) => {
  new ListProductController().handle(request, response);
});

router.get(
  "/products/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid(),
    },
  }),
  (request, response) => {
    new FindProductIdController().handle(request, response);
  }
);

router.delete(
  "/products/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid(),
    },
  }),
  (request, response) => {
    new DeleteProductController().handle(request, response);
  }
);

router.put(
  "/products/:id",
  celebrate(
    {
      [Segments.PARAMS]: {
        id: Joi.string().required().uuid(),
      },
      [Segments.BODY]: {
        name: Joi.string().required(),
        description: Joi.string().required().max(200),
        category: Joi.string().required().max(80),
        code: Joi.string().required(),
        quantity: Joi.number().required(),
        price: Joi.number().precision(2).required(),
      },
    },
    { abortEarly: false }
  ),

  (request, response) => {
    new UpdateProductController().handle(request, response);
  }
);

export { router };
