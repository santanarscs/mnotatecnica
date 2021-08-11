import { getRepository, Repository } from "typeorm";
import { Process } from "../models/Process";

interface ICreateProcessDTO {
  number: number;
  note_id: string;
}

class ProcessesRepository {
  private repository: Repository<Process>;

  constructor() {
    this.repository = getRepository(Process);
  }

  public async findById(id: string): Promise<Process | undefined> {
    const process = await this.repository.findOne(id);
    return process;
  }

  public async findByNote(note_id: string): Promise<Process[]> {
    const interestedList = await this.repository.find({ note_id });
    return interestedList;
  }

  public async list(): Promise<Process[]> {
    const processes = await this.repository.find();
    return processes;
  }

  public async create(data: ICreateProcessDTO): Promise<Process> {
    const process = this.repository.create(data);
    await this.repository.save(process);
    return process;
  }

  public async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}

export { ProcessesRepository };
