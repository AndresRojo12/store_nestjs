import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn
} from 'typeorm';

import { Customer } from './customer.entity'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  email: String;
  @Column()
  password: String;
  @Column()
  role: String;
  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @OneToOne(() => Customer, (customer) => customer.user, { nullable: true })
  @JoinColumn({name: 'customer_id'})
  customer: Customer;
}
