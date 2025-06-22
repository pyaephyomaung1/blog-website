import {
  Column,
  CreateDateColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Category } from "./Category";

export class Article {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 300, nullable: false })
  title: string;

  @Column({ type: "varchar", length: 350, unique: true })
  slug: string;

  @Column({ type: "varchar", length: 500, nullable: false })
  image: string;

  @Column({ type: "longtext" })
  body: string;

  @Column({ name: "category_id" })
  category_id: number;

  @ManyToOne(() => Category, (category) => category.articles, { eager: true })
  category: Category;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
