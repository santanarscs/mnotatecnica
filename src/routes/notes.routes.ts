import { Router, Request, Response } from "express";
import { InterestedRepository } from "../repositories/InterestedRepository";
import { ItemsRepository } from "../repositories/ItemsRepository";
import { ProcessesRepository } from "../repositories/ProcessesRepository";
import { NotesRepository } from "../repositories/NotesRepository";

const noteRoutes = Router();

noteRoutes.get("/:id", async (request: Request, response: Response) => {
  const { id } = request.params;

  const repository = new NotesRepository();
  const note = await repository.findById(id);

  return response.json(note);
});

noteRoutes.get("/", async (request: Request, response: Response) => {
  const repository = new NotesRepository();
  const notes = await repository.list();
  return response.json(notes);
});

noteRoutes.post("/", async (request: Request, response: Response) => {
  const repository = new NotesRepository();
  const processRepository = new ProcessesRepository();
  const interestedRepository = new InterestedRepository();
  const itemsRepository = new ItemsRepository();
  try {
    const { note, process, interested, items } = request.body;

    const createdNote = await repository.create(note);

    await processRepository.create({
      ...process,
      note_id: createdNote.id,
    });
    await interestedRepository.create({
      ...interested,
      note_id: createdNote.id,
    });

    // eslint-disable-next-line no-restricted-syntax
    for await (const item of items) {
      const itemCreated = await itemsRepository.create({
        text: item.text,
        ordering: item.ordering,
        note_id: createdNote.id,
      });
      if (item.children) {
        // eslint-disable-next-line no-restricted-syntax
        for await (const child of item.children) {
          await itemsRepository.create({
            text: child.text,
            ordering: child.ordering,
            note_id: createdNote.id,
            parent_id: itemCreated.id,
          });
        }
      }
    }
    return response.json(createdNote);
  } catch (e) {
    return response.status(400).json(e);
  }
});

export { noteRoutes };
