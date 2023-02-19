import { Type } from 'class-transformer';
import { IsInt, Min } from 'class-validator';
import type { IPageQuery } from '@severstal-test/common';

export class PageQuery implements IPageQuery {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  public page: number;
}
