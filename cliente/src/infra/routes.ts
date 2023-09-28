import { Router, request, response } from "express";
import { CreateClientController } from "../modules/create-client/create-client.controller";
import { ListClientsController } from "../modules/list-client/list-clients.controller";
import { DeleteClientController } from "../modules/delete-client/delete-client.controller";
import { UpdateClientController } from "../modules/update-client/update-client.controller";

const router = Router();

router.get("/customers", (request, response) => {
  new ListClientsController().handle(request, response);
});
router.post("/customers", (request, response) => {
  new CreateClientController().handle(request, response);
});

router.delete("/customers/:id", (request, response) => {
  new DeleteClientController().handle(request, response);
});

router.put("/customers/:id", (request, response) => {
  new UpdateClientController().handle(request, response);
});

export { router };
