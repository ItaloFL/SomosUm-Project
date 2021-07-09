import {Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn} from "typeorm"
import { v4 as uuid } from "uuid";

@Entity("categories")
class Categorie {

  @PrimaryColumn()
  categorieID: string

  @Column()
  categorieName: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  constructor() {
    if(!this.categorieID) {
      this.categorieID = uuid();
    }
  }
}

export { Categorie }