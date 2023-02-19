import { Note } from './entity/note.entity';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException, Injectable } from '@nestjs/common';
import type { CreateNoteBody, UpdateNoteBody } from './dto';
import type { FindManyOptions, FindOptionsSelect, Repository } from 'typeorm';

@Injectable()
export class NoteService {
  private readonly perPage: number;
  private readonly notExistException = new BadRequestException(
    'Note does not exist',
  );
  private readonly baseSelect: FindOptionsSelect<Note> = {
    id: true,
    text: true,
    updatedDate: true,
    createdDate: true,
  };

  constructor(
    @InjectRepository(Note)
    private readonly noteRepository: Repository<Note>,
    private readonly configService: ConfigService,
  ) {
    this.perPage = Number(this.configService.get('PER_PAGE'));
  }

  /* Создание записи */
  public create(body: CreateNoteBody) {
    const note = this.noteRepository.create(body);
    return this.noteRepository.save(note);
  }

  /* Обновление записи */
  public async update(id: number, body: UpdateNoteBody) {
    const note = await this.noteRepository.findOne({ where: { id } });
    if (!note) throw this.notExistException;

    const updatedNote = { ...note, ...body };
    return this.noteRepository.save(updatedNote);
  }

  /* Удаление записи */
  public async remove(id: number) {
    const note = await this.noteRepository.findOne({ where: { id } });
    if (!note) throw this.notExistException;

    await this.noteRepository.delete({ id });
    return note;
  }

  /* Запись по идентификатору */
  public async findOne(id: number) {
    const note = await this.noteRepository.findOne({
      where: { id },
      select: this.baseSelect,
    });

    if (!note) throw this.notExistException;
    return note;
  }

  /* Список записей с пагинаций */
  public async findAll(page: number) {
    const { perPage } = this;
    const query: FindManyOptions<Note> = {
      order: { id: 'asc' },
      take: this.perPage,
      skip: this.perPage * (page - 1),
    };

    const [data, count] = await this.noteRepository.findAndCount(query);
    return { data, count, perPage, page };
  }
}
