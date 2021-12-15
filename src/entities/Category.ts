import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int', unsigned: true })
  id: number;

  @Column('uuid')
  uuid: string;

  @Column({ name: 'name', type: 'varchar' })
  name: string;

  @Column({ name: 'description' })
  description: string;

  @Column({ name: 'created_at' })
  created_at: Date;

  constructor() {
    if (!this.uuid) {
      this.uuid = uuid();
    }
  }
}
