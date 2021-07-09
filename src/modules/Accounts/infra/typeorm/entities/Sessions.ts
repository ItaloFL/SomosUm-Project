import { Entity, Column, JoinColumn, ManyToOne, PrimaryColumn, CreateDateColumn, UpdateDateColumn } from "typeorm"
import { v4 as uuid } from "uuid";
import { User } from "./User";

@Entity("sessions")
class Session {

  @PrimaryColumn()
  session_id: string

  @JoinColumn({ name: "user_id" })
  @ManyToOne(() => User)
  user: User;

  @Column()
  user_id: string

  @CreateDateColumn()
  login: Date

  @UpdateDateColumn({ nullable: true })
  logout: Date

  constructor() {
    if (!this.session_id) {
      this.session_id = uuid();
    }
  }
}

export { Session }