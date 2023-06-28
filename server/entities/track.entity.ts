import { Column, Entity, ManyToOne } from 'typeorm';

import { Model } from './BaseEntity';
import { Vinyl } from './vinyl.entity';

@Entity({ name: 'tracks' })
export class Track extends Model {
  @Column()
  trackName: string;

  @Column({ type: 'decimal' })
  duration: number;

  @Column()
  side: string;

  @ManyToOne('Vinyl', 'tracks', { cascade: true, onDelete: 'CASCADE' })
  vinyl: Vinyl;
}
