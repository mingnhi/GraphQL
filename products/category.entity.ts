import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class CategotyEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  image: string;
}
