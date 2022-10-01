import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class createWaterSchedule1664597778675 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'water_scheduler',
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
            name: 'description',
            type: 'text',
          },
          {
            name: 'water_quantity',
            type: 'int',
          },
          {
            name: 'scheduled',
            type: 'timestamp',
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
            name: 'plant_type_id',
            type: 'int',
          },
        ],
      }),
    );
    await queryRunner.createForeignKey(
      'water_scheduler', // The foreign key in there.
      new TableForeignKey({
        columnNames: ['plant_type_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'plant_type',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('water_scheduler');
    const fks = await table.foreignKeys.filter(
      (fk) => fk.columnNames.indexOf('plant_type_id') !== -1,
    );
    await queryRunner.dropForeignKeys('water_scheduler', fks);
    await queryRunner.dropTable('water_scheduler');
  }
}
