import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('scrapers')
export class ScraperEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  website: string;

  @Column({ type: "text", array: true })
  image: string[];

  @Column({ type: "text", array: true })
  video: string[]

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}