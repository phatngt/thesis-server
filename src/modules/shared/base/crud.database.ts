import { PagingDto } from 'src/dto/shared/base/crud';
import { auditAdd, auditUpdate } from 'src/helpers';
import { User } from 'src/models';
import { FindOptions, IBaseCRUD } from 'src/types/base/crud';
import { Repository } from 'typeorm';

export class BaseCRUD implements IBaseCRUD {
  constructor(protected domainReposity: Repository<any>) {}

  protected parseLimit(limit: number) {
    return limit || 10;
  }

  protected parseSkip(offset: number) {
    return offset || 0;
  }

  protected addNonActiveRecordsFilter(filter: any) {
    if (!filter) {
      return {
        isDeleted: false,
      };
    }

    filter.isDeleted = false;
    return filter;
  }

  public async getOne(filter: any = {}, options: Partial<FindOptions> = {}) {
    const query = {
      where: filter,
    };

    if (options.select) {
      query['select'] = options.select;
    }
    if (options.relations) {
      query['relations'] = options.relations;
    }

    return await this.domainReposity.findOne(query);
  }

  public async count(filter: any = {}) {
    return await this.domainReposity.count(filter);
  }

  public async paginate(
    pagingDTO: PagingDto,
    options: Partial<FindOptions> = {},
  ) {
    const { filter, limit, offset } = pagingDTO || {};
    const activeFilter = this.addNonActiveRecordsFilter(filter);
    const total = await this.domainReposity.count(activeFilter);

    const query = {
      where: activeFilter,
      skip: offset,
      take: limit,
    };

    if (pagingDTO.order || options.order) {
      query['order'] = options.order || pagingDTO.order;
    }
    if (options.relations) {
      query['relations'] = options.relations;
    }
    if (options.select) {
      query['select'] = options.select;
    }

    const rows = await this.domainReposity.find(query);
    return {
      rows,
      total,
      limit,
      offset,
    };
  }

  public async getAll(filter?: any, options: Partial<FindOptions> = {}) {
    const activeFilter = this.addNonActiveRecordsFilter(filter);
    const query = {
      where: activeFilter,
    };

    if (options.pairWithId) {
      query['where'] = { ...query.where, ...options.pairWithId };
    }

    if (options.order) {
      query['order'] = options.order;
    }
    if (options.relations) {
      query['relations'] = options.relations;
    }
    if (options.select) {
      query['select'] = options.select;
    }

    const rows = await this.domainReposity.find(query);
    return rows;
  }

  public async getById(id: number, options: Partial<FindOptions> = {}) {
    const query = {
      where: { id },
    };

    if (options.pairWithId) {
      query['where'] = { ...query.where, ...options.pairWithId };
    }

    if (options.relations) {
      query['relations'] = options.relations;
    }
    if (options.select) {
      query['select'] = options.select;
    }

    return await this.domainReposity.findOne(query);
  }

  public async create(createDTO: any, user?: User) {
    const dataWithAudit = { ...createDTO, ...auditAdd(user) };

    return await this.domainReposity.save(dataWithAudit);
  }

  public async updateById(id: number, updateDTO: any, user?: Partial<User>) {
    const dataWithAudit = { ...updateDTO, ...auditUpdate(user) };

    const result = await this.domainReposity
      .createQueryBuilder()
      .update(this.domainReposity.target)
      .set(dataWithAudit)
      .where('id = :id', { id: id })
      .returning('*')
      .execute();
    return result.raw[0];
  }

  // public bulkUpdate(
  //   criteria: any,
  //   updateDTO: any,
  //   user?: Users
  // ) {
  //   const dataWithAudit = { ...updateDTO, ...auditUpdate(user) };

  //   return this.domainReposity.updateMany(criteria, dataWithAudit, {
  //     new: true
  //   });
  // }

  public async softDeleteById(
    id: number,
    user?: Partial<User>,
  ): Promise<boolean> {
    const data = { isDeleted: true, ...auditUpdate(user) } as any;
    const result = await this.domainReposity
      .createQueryBuilder()
      .update(this.domainReposity.target)
      .set(data)
      .where('id = :id AND owner = :user', { id: id, user: user.id })
      .returning('*')
      .execute();
    console.log('result: ', result);
    if (result.raw[0]) return true;
    return false;
  }

  public async deleteById(id: number) {
    return await this.domainReposity
      .createQueryBuilder()
      .delete()
      .from(this.domainReposity.target)
      .where('id = :id', { id: id })
      .execute();
  }
}
