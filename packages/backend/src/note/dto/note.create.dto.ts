import { IsString } from 'class-validator';
import { IsNotEmpty, Length } from 'class-validator';
import { BaseNoteDTO } from './note.base.dto';
import type { ICreateNoteBody, ICreateNoteDTO } from '@severstal-test/common';

export class CreateNoteBody implements ICreateNoteBody {
  @IsString()
  @IsNotEmpty()
  @Length(1, 16384)
  public text: string;
}

export class CreateNoteDTO extends BaseNoteDTO implements ICreateNoteDTO {}
