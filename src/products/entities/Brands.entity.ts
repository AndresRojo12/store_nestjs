import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany
} from 'typeorm';

import { Products } from './products.entity'

@Entity()
export class Brands {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: String;
  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
  @OneToMany(() => Products, (product) => product.brand)
  products : Products[];

}
