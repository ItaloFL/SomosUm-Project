import { Entity, PrimaryColumn, Column, CreateDateColumn, BeforeInsert, BeforeUpdate } from "typeorm";
import { v4 as uuid } from "uuid"
import bcrypt from "bcryptjs"

@Entity("users")
class User {
  @PrimaryColumn()
  user_id: string

  @Column()
  email: string

  @Column()
  username: string

  @Column()
  passwd: string

  @Column()
  whatsapp: string

  @Column()
  data_nascimento: string

  @Column()
  church: string

  @Column()
  genero: boolean

  @Column({ nullable: true })
  CPF: string

  @Column({ nullable: true })
  CNPJ: string

  @Column()
  isCNPJ: boolean


  @Column({ nullable: true })
  photo: string;


  @Column()
  isAdmin: boolean

  @CreateDateColumn()
  created_at: Date

  constructor() {
    if (!this.user_id) {
      this.user_id = uuid()
    }
  }
}

export { User }