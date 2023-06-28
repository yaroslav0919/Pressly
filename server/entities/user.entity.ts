import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { USER_ROLE } from '@server/utils/constants.util';
import { transformer } from '@server/utils/transformerForEntityTypes.util';

import { AccountEntity, SessionEntity } from './index';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ nullable: true })
  name: string;

  @Index({ unique: true })
  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true, default: USER_ROLE.regularUser })
  role: string;

  @Column({ nullable: true })
  image: string;

  @Column({ type: 'varchar', nullable: true, transformer: transformer.date })
  emailVerified!: string | null;

  @Column({ nullable: true, type: 'varchar' })
  emailVerificationToken!: string | null;

  @Column({ type: 'varchar', nullable: true, transformer: transformer.date })
  emailVerificationTokenExpires!: string | null;

  @Column({ nullable: true, type: 'varchar' })
  resetPasswordToken!: string | null;

  @Column({ type: 'varchar', nullable: true, transformer: transformer.date })
  resetPasswordTokenExpires!: string | null;

  @OneToMany(() => SessionEntity, (session) => session.userId)
  sessions!: SessionEntity[];

  @OneToMany(() => AccountEntity, (account) => account.userId)
  accounts!: AccountEntity[];
}
