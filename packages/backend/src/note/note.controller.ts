import {
  Get,
  Put,
  Body,
  Post,
  Param,
  Query,
  Delete,
  Controller,
} from '@nestjs/common';
import {
  RemoveNoteDTO,
  CreateNoteDTO,
  UpdateNoteDTO,
  CreateNoteBody,
  FindOneNoteDTO,
  UpdateNoteBody,
  FindAllNoteDTO,
} from './dto';
import { IdParam, PageQuery } from 'src/common/dto';
import { NoteService } from './note.service';

@Controller('note')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Post()
  public async create(@Body() body: CreateNoteBody) {
    const note = await this.noteService.create(body);
    return new CreateNoteDTO(note);
  }

  @Put(':id')
  public async update(@Param() { id }: IdParam, @Body() body: UpdateNoteBody) {
    const note = await this.noteService.update(id, body);
    return new UpdateNoteDTO(note);
  }

  @Delete(':id')
  public async remove(@Param() { id }: IdParam) {
    const note = await this.noteService.remove(id);
    return new RemoveNoteDTO(note);
  }

  @Get()
  public async findAll(@Query() { page }: PageQuery) {
    const { data, ...option } = await this.noteService.findAll(page);
    return new FindAllNoteDTO(data, option);
  }

  @Get(':id')
  public async findOne(@Param() { id }: IdParam) {
    const note = await this.noteService.findOne(id);
    return new FindOneNoteDTO(note);
  }
}
