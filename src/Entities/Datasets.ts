import { Column, Entity,  PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';


@Entity('Datasets')
export class Datasets {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'uuid' })
  uuid: string;

  @Column({ name: 'window' })
  window: number;

  @Column({ name: 'period' })
  period: string;

  @Column({ name: 'upload_date' })
  upload_date: Date;

  @Column({ name: 'upload_type' })
  upload_type: string;
  constructor() {
    if (!this.uuid) {
      this.uuid = uuid();
    }
  }
}