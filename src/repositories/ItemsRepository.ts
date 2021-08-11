import { getRepository, Repository } from "typeorm";
import { Item } from "../models/Item";

interface ICreateItemDTO {
  text: string;
  ordering: number;
  note_id: string;
  parent_id?: string;
}

class ItemsRepository {
  private repository: Repository<Item>;

  constructor() {
    this.repository = getRepository(Item);
  }

  public async findById(id: string): Promise<Item | undefined> {
    const item = await this.repository.findOne(id);
    return item;
  }

  public async findByNote(note_id: string): Promise<Item[]> {
    const interestedList = await this.repository.find({ note_id });
    return interestedList;
  }

  public async list(): Promise<Item[]> {
    const items = await this.repository.find();
    return items;
  }

  public async create(data: ICreateItemDTO): Promise<Item> {
    const item = this.repository.create(data);
    await this.repository.save(item);
    return item;
  }

  public async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}

export { ItemsRepository };
