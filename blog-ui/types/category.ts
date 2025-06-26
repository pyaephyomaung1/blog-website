import { Article } from "./article";

export interface Category {
  id: string;
  name: string;
  articles?: Article[];
}
