import { ApiProperty } from '@nestjs/swagger';
import type { IOptionDTO } from '@severstal-test/common';

export type ConstructorOptionDTO = {
  page: number;
  count: number;
  perPage: number;
};

export class OptionDTO implements IOptionDTO {
  /* Элементов на странице */
  @ApiProperty()
  public itemsPerPage: number;

  /* Общее количество записей */
  @ApiProperty()
  public totalItems: number;

  /* Общее количество страниц */
  @ApiProperty()
  public totalPage: number;

  /* Текущая страница */
  @ApiProperty()
  public currentPage: number;

  constructor(options: ConstructorOptionDTO) {
    const { count, perPage } = options;

    this.totalItems = options.count;
    this.currentPage = options.page;
    this.itemsPerPage = perPage;
    this.totalPage = Math.ceil(count / perPage);
  }
}
