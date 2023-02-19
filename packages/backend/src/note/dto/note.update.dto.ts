import { BaseNoteDTO } from './note.base.dto';
import { CreateNoteBody } from './note.create.dto';
import type { IUpdateNoteBody, IUpdateNoteDTO } from '@severstal-test/common';

export class UpdateNoteBody extends CreateNoteBody implements IUpdateNoteBody {}

export class UpdateNoteDTO extends BaseNoteDTO implements IUpdateNoteDTO {}
