import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Category } from './Category';

@Entity('videos')
export class Videos {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'uuid' })
  uuid: string;

  @Column({ name: 'duration' })
  duration: number;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'category_id' })
  category_id: number;

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'category_id' })
  category: Category;

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
