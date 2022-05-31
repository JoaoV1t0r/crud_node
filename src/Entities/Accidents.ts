import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity('accidents')
export class Accidents {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'uuid' })
  uuid: string;

  @Column({ name: 'upload_date' })
  upload_date: Date;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'category_id' })
  category_id: number;


  constructor() {
    if (!this.uuid) {
      this.uuid = uuid();
    }
  }
}