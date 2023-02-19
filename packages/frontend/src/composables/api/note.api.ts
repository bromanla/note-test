import type {
  IIdParam,
  IPageQuery,
  ICreateNoteBody,
  IUpdateNoteBody,
  ICreateNoteDTO,
  IRemoveNoteDTO,
  IUpdateNoteDTO,
  IFindAllNoteDTO,
  IFindOneNoteDTO,
} from '@severstal-test/common';
import { ApiInstance } from './api.instance';
import type { Unbind } from '~/composables';

export class NoteAPI extends ApiInstance {
  protected path = 'note';

  public async findAll(params: Unbind<IPageQuery>) {
    const searchParams = this.toUrlSearchParam(params);
    return this.wrapper(() =>
      this.api.get(this.path, { searchParams }).json<IFindAllNoteDTO>(),
    );
  }

  public async findOne({ id }: IIdParam) {
    return this.wrapper(() =>
      this.api.get(this.pathId(id)).json<IFindOneNoteDTO>(),
    );
  }

  public create(body: ICreateNoteBody) {
    return this.wrapper(() =>
      this.api.post(this.path, { json: body }).json<ICreateNoteDTO>(),
    );
  }

  public update(id: number, body: IUpdateNoteBody) {
    return this.wrapper(() =>
      this.api.put(this.pathId(id), { json: body }).json<IUpdateNoteDTO>(),
    );
  }

  public remove(id: number) {
    return this.wrapper(() =>
      this.api.delete(this.pathId(id)).json<IRemoveNoteDTO>(),
    );
  }
}
