import { Router, Request, Response } from "express";
import { ProcessesRepository } from "../repositories/ProcessesRepository";

const processesRoutes = Router();

processesRoutes.get(
  "/note/:id",
  async (request: Request, response: Response) => {
    const { id } = request.params;
    const repository = new ProcessesRepository();

    const interestedList = await repository.findByNote(id);
    return response.json(interestedList);
  }
);

export { processesRoutes };
