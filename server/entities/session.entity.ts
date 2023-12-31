import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { transformer } from '@server/utils/transformerForEntityTypes.util';

import { UserEntity } from './index';

@Entity({ name: 'sessions' })
export class SessionEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true })
  sessionToken: string;

  @Column({ type: 'uuid' })
  userId: string;

  @Column({ transformer: transformer.date })
  expires!: string;

  @ManyToOne(() => UserEntity, (user) => user.sessions)
  user!: UserEntity;
}
