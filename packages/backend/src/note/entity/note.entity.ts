import {
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Note {
  @PrimaryGeneratedColumn({ type: 'integer' })
  public id: number;

  @Column({ type: 'text', length: 16384 })
  public text: string;

  @CreateDateColumn({ type: 'datetime', comment: 'Дата создания' })
  public createdDate: Date;

  @UpdateDateColumn({ type: 'datetime', comment: 'Дата обновления' })
  public updatedDate: Date;
}
