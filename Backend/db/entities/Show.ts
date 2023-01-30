import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Person } from './Person.js';

@Entity()
export class Show {
  @PrimaryColumn("varchar")
  id: string;

  @Column("varchar")
  title: string;

  @Column("varchar")
  streamingApp: string;

  @Column("float")
  rating: number;

  @Column("varchar")
  review: string;

  @ManyToOne(type => Person, (person) => person.id)
  person: Person;
}
