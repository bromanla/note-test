import type { IOptionDTO } from '@severstal-test/common';

export type ConstructorOptionDTO = {
  page: number;
  count: number;
  perPage: number;
};

export class OptionDTO implements IOptionDTO {
  /* Элементов на странице */
  public itemsPerPage: number;
  /* Общее количество записей */
  public totalItems: number;
  /* Общее количество страниц */
  public totalPage: number;
  /* Текущая страница */
  public currentPage: number;

  constructor(options: ConstructorOptionDTO) {
    const { count, perPage } = options;

    this.totalItems = options.count;
    this.currentPage = options.page;
    this.itemsPerPage = perPage;
    this.totalPage = Math.ceil(count / perPage);
  }
}
