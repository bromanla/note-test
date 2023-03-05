import { Note } from '../entity/note.entity';
import { ApiProperty } from '@nestjs/swagger';
import type { IBaseNoteDTO } from '@severstal-test/common';

export class BaseNoteDTO implements IBaseNoteDTO {
  @ApiProperty()
  public id: number;

  @ApiProperty()
  public text: string;

  @ApiProperty()
  public createdDate: Date;

  @ApiProperty()
  public updatedDate: Date;

  constructor(note: Note) {
    this.id = note.id;
    this.text = note.text;
    this.createdDate = note.createdDate;
    this.updatedDate = note.updatedDate;
  }
}
