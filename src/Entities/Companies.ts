import { Column, Entity,  PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';


@Entity('Companies')
export class Companies {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'uuid' })
  uuid: string;

  @Column({ name: 'cnpj' })
  cnpj: string;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'created_at' })
  created_at: Date;

  constructor() {
    if (!this.uuid) {
      this.uuid = uuid();
    }
  }
}