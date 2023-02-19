import type { IOptionDTO } from '../common';
import type { IBaseNoteDTO } from './note.base.dto';

export type IFindAllNoteDTO = {
  data: IBaseNoteDTO[];
  option: IOptionDTO;
};
