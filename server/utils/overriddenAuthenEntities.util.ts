import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { UserEntity, SessionEntity, AccountEntity } from '@server/entities';

import { transformer } from './transformerForEntityTypes.util';

@Entity({ name: 'verification_tokens' })
class VerificationTokenEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  token!: string;

  @Column()
  identifier!: string;

  @Column({ transformer: transformer.date })
  expires!: string;
}

export { UserEntity, SessionEntity, AccountEntity, VerificationTokenEntity };
