import { Note } from '../entity/note.entity';
import type { IBaseNoteDTO } from '@severstal-test/common';

export class BaseNoteDTO implements IBaseNoteDTO {
  public id: number;
  public text: string;
  public createdDate: Date;
  public updatedDate: Date;

  constructor(note: Note) {
    this.id = note.id;
    this.text = note.text;
    this.createdDate = note.createdDate;
    this.updatedDate = note.updatedDate;
  }
}
