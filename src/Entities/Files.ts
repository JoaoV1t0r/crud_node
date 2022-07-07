import { Column, Entity,  PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';


@Entity('Files')
export class Files {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'uuid' })
  uuid: string;

  @Column({ name: 'cnpj' })
  cnpj: string;

  @Column({ name: 'file_name' })
  file_name: string;

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