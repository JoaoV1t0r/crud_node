import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Category } from './Category';
import { Users } from './Users';

@Entity('refresh_token')
export class RefreshToken {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'uuid' })
  uuid: string;

  @Column({ name: 'user_id' })
  userId: number;

  @ManyToOne(() => Users)
  @JoinColumn({ name: 'user_id' })
  user: Users;

  @Column({ name: 'expires_in' })
  expiresIn: number;

  @Column({ name: 'created_at' })
  createdAt: Date;

  constructor() {
    if (!this.uuid) {
      this.uuid = uuid();
    }
  }
}
