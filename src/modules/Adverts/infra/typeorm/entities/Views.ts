import {Entity, Column, JoinColumn, ManyToOne, PrimaryColumn, CreateDateColumn} from "typeorm"
import { v4 as uuid } from "uuid";

import { User } from "@modules/Accounts/infra/typeorm/entities/User";


@Entity("views")
class View {
  
  @PrimaryColumn()
  view_id: string
  
  @Column()
  ad_id: string

  @JoinColumn({ name: "user_id" })
  @ManyToOne( () => User, user => user.church )
  user: User;

  @Column()
  user_id: string

  @CreateDateColumn()
  created_at: Date

  constructor () {
    if (!this.view_id) {
      this.view_id = uuid();
    }
  }
}

export { View }