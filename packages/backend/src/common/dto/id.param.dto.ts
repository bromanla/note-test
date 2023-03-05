import { Type } from 'class-transformer';
import { IsInt, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import type { IIdParam } from '@severstal-test/common';

export class IdParam implements IIdParam {
  @ApiProperty()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  public id: number;
}
