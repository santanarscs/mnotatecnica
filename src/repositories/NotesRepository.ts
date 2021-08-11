import { getRepository, Repository } from "typeorm";
import { Note } from "../models/Note";

interface ICreateNoteDTO {
  subject: string;
  number: number;
  supervisor: string;
  coordinator: string;
}

class NotesRepository {
  private repository: Repository<Note>;

  constructor() {
    this.repository = getRepository(Note);
  }

  public async findById(id: string): Promise<Note | undefined> {
    const note = await this.repository.findOne(id);
    return note;
  }

  public async list(): Promise<Note[]> {
    const notes = await this.repository.find();
    return notes;
  }

  public async create(data: ICreateNoteDTO): Promise<Note> {
    const note = this.repository.create(data);
    await this.repository.save(note);
    return note;
  }

  public async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}

export { NotesRepository };
