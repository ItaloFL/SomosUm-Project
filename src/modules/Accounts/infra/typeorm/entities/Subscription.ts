import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User";
import { v4 as uuid } from "uuid"


@Entity("subscription")
class Subscription {
  
  @PrimaryColumn()
  id: string;

  @OneToOne(() => User)
  @JoinColumn({ name: "user_id" })
  User: User;  
  
  @Column()
  user_id: string;
  
  @Column()
  paid: boolean;
  
  @Column()
  expire_date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid()
    }
  }
}

export { Subscription }