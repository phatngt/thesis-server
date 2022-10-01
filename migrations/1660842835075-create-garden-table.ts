import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class createRoomTable1660842835075 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'garden',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
            isUnique: true,
          },
          {
            name: 'name',
            type: 'text',
          },
          {
            name: 'image',
            type: 'varchar',
          },
          {
            name: 'size',
            type: 'int',
            default: 0,
          },
          {
            name: 'location',
            type: 'text',
          },
          {
            name: 'is_deleted',
            type: 'boolean',
            default: false,
          },
          {
            name: 'create_at',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'update_at',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'owner',
            type: 'int',
          },
        ],
      }),
    );
    // Create foreign keys
    await queryRunner.createForeignKey(
      'garden',
      new TableForeignKey({
        columnNames: ['owner'],
        referencedColumnNames: ['id'],
        referencedTableName: 'user',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('garden');
    const foreignKeys = table.foreignKeys.filter(
      (fk) => fk.columnNames.indexOf('owner') !== -1,
    );
    await queryRunner.dropForeignKeys('garden', foreignKeys);
    await queryRunner.dropTable('garden');
  }
}
