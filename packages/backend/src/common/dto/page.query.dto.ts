import { Type } from 'class-transformer';
import { IsInt, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import type { IPageQuery } from '@severstal-test/common';

export class PageQuery implements IPageQuery {
  @ApiProperty()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  public page: number;
}
