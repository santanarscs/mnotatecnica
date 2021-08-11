import { getRepository, Repository } from "typeorm";
import { Interested } from "../models/Interested";

interface ICreateInterestedDTO {
  name: string;
  cpf?: string;
  cnpj?: string;
  note_id: string;
}

class InterestedRepository {
  private repository: Repository<Interested>;

  constructor() {
    this.repository = getRepository(Interested);
  }

  public async findById(id: string): Promise<Interested | undefined> {
    const interested = await this.repository.findOne(id);
    return interested;
  }

  public async findByNote(note_id: string): Promise<Interested[]> {
    const interestedList = await this.repository.find({ note_id });
    return interestedList;
  }

  public async list(): Promise<Interested[]> {
    const interestedList = await this.repository.find();
    return interestedList;
  }

  public async create(data: ICreateInterestedDTO): Promise<Interested> {
    const interested = this.repository.create(data);
    await this.repository.save(interested);
    return interested;
  }

  public async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}

export { InterestedRepository };
