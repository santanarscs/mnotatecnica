import { Router, Request, Response } from "express";
import { ItemsRepository } from "../repositories/ItemsRepository";

const itemsRoutes = Router();

itemsRoutes.get("/note/:id", async (request: Request, response: Response) => {
  const { id } = request.params;
  const repository = new ItemsRepository();

  const interestedList = await repository.findByNote(id);
  return response.json(interestedList);
});

export { itemsRoutes };
