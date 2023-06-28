import { Column, Entity } from 'typeorm';

import { Model } from './BaseEntity';

@Entity({ name: 'artists' })
export class Artist extends Model {
  @Column()
  name: string;

  @Column()
  artistName: string;

  @Column()
  email: string;

  @Column()
  avatar: string;

  @Column({ length: 300 })
  artistBio: string;

  @Column({ nullable: true })
  phoneNumber: string;
}
