import { AfterLoad, Column, Entity, OneToMany } from 'typeorm';

import { Model } from './BaseEntity';
import { Track } from './track.entity';

@Entity({ name: 'vinyls' })
export class Vinyl extends Model {
  @Column()
  jacketType: string;

  @Column()
  additional: string;

  @Column()
  frontArtwork: string;

  @Column()
  backArtwork: string;

  @Column()
  spineArtwork: string;

  @Column({
    nullable: true,
  })
  insideLeftArtwork: string;

  @Column({ nullable: true })
  insideRightArtwork: string;

  @Column({ nullable: true })
  vinylGramWeight: string;

  @Column({ nullable: true })
  vinylColor: string;

  @Column({ nullable: true })
  labelType: string;

  @Column({ nullable: true })
  labelColor: string;

  @Column({ nullable: true })
  vinylSideA: string;

  @Column({ nullable: true })
  sideATracksOnLabel: boolean;

  @Column({ nullable: true })
  vinylSideB: string;

  @Column({ nullable: true })
  sideBTracksOnLabel: boolean;

  @Column({ nullable: true })
  albumName: string;

  @Column({ nullable: true })
  albumBio: string;

  @OneToMany('Track', 'vinyl', { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  tracks: Track[];

  @Column({ nullable: true })
  vinylCopies: string;

  @Column({ nullable: true })
  quantityOrDuration: number;

  @Column('text', { nullable: true, array: true })
  sideATracks: Track[];

  @Column('text', { nullable: true, array: true })
  sideBTracks: Track[];

  @AfterLoad()
  filterTracks() {
    if (!this.tracks) return;
    this.sideATracks = this.tracks.filter((track) => track.side === 'side_a');
    this.sideBTracks = this.tracks.filter((track) => track.side === 'side_b');
  }
}
