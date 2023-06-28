import { Column, Entity } from 'typeorm';

import { Model } from './BaseEntity';

@Entity({ name: 'subscribers' })
export class Subscriber extends Model {
  @Column()
  email: string;
}
