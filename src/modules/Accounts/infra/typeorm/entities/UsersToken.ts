import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm"
import { v4 as uuid } from 'uuid'

@Entity("usersToken")
class UsersToken{

  @PrimaryColumn()
  id: string

  @Column()
  user_id: string

  @Column()
  refresh_token: string

  @Column()
  expires_date: Date

  @CreateDateColumn()
  created_at: Date


  constructor(){
    if(!this.id){
      this.id = uuid()
    }
  }

}

export { UsersToken }