import { Module } from '@nestjs/common';
import { NotesService } from './notes.service';
import { NotesController } from './notes.controller';
import { Note } from './entities/note.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image } from './entities/images.entity';

@Module({
  controllers: [NotesController],
  imports: [TypeOrmModule.forFeature([Note, Image])],
  providers: [NotesService],
})
export class NotesModule {}
