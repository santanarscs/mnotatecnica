import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Note } from "./Note";

@Entity("items")
class Item {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  text: string;

  @Column()
  ordering: number;

  @Column()
  note_id: string;

  @ManyToOne(() => Note)
  @JoinColumn({ name: "note_id" })
  note: Note;

  @ManyToOne(() => Item, (item) => item.children)
  parent: Item;

  @OneToMany(() => Item, (item) => item.parent)
  children: Item[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export { Item };
