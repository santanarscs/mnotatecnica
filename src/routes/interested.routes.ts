import { Router, Request, Response } from "express";
import { InterestedRepository } from "../repositories/InterestedRepository";

const interestedRoutes = Router();

interestedRoutes.get(
  "/note/:id",
  async (request: Request, response: Response) => {
    const { id } = request.params;
    const repository = new InterestedRepository();

    const interestedList = await repository.findByNote(id);
    return response.json(interestedList);
  }
);

export { interestedRoutes };
