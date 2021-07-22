import { Entity, PrimaryColumn, JoinColumn, ManyToOne, Column, CreateDateColumn, UpdateDateColumn} from "typeorm";
import { v4 as uuid } from "uuid";

import { User } from "@modules/Accounts/infra/typeorm/entities/User";
import { Categorie } from "./Categorie"

@Entity("anuncios")
class Anuncio {

  @PrimaryColumn()
  ad_id : string
  
  @JoinColumn({ name: "user_id" })
  @ManyToOne( () => User )
  user: User;
  
  @Column()
  user_id : string

  @Column()
  ad_name : string

  @Column()
  description : string

  @Column()
  price : string

  @Column()
  price_type: boolean

  @JoinColumn({ name: "categorieID"})
  @ManyToOne( () => Categorie )
  categorie: Categorie;

  @Column()
  categorieID: string

  @Column("simple-array") 
  photos: string[]; 

  @CreateDateColumn()
  created_at : Date

  @UpdateDateColumn()
  updated_at : Date

  constructor() {
    if(!this.ad_id){
      this.ad_id = uuid()
    }
  }
}

export { Anuncio }