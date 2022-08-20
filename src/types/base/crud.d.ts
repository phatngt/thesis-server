import { User } from "src/models";

export interface PagingResponse<T> {
  rows: T[];
  limit: number;
  offset: number;
  total: number;
}

export interface FindOptions {
  order: any;
  select: string[];
  relations: string[];
  pairWithId: any
}

export interface IBaseCRUD<T = any> {
  paginate(
    pagingDTO: PagingDto,
    options?: Partial<FindOptions>
  ): Promise<PagingResponse<T>>;

  getById(id: number, options?: Partial<FindOptions>): Promise<T>;
  create(createDTO: any, user: User): Promise<T>;
  updateById(id: number, updateDTO: any, user: User): Promise<T>;
  deleteById(id: number): Promise<DeleteResult>;
}
