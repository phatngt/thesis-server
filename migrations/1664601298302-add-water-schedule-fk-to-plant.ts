import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey
} from 'typeorm';

export class addWaterScheduleFkToPlant1664601298302
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('plants');
    if (!table) return;
    // Add column
    await queryRunner.addColumn(
      'plants',
      new TableColumn({
        name: 'water_scheduler_id',
        type: 'int',
        isNullable: true
      })
    );
    //Create foriegn key
    await queryRunner.createForeignKey(
      'plants', // The foreign key in there.
      new TableForeignKey({
        columnNames: ['water_scheduler_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'water_scheduler',
        onDelete: 'CASCADE'
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('plants');
    if (!table) return;
    const fk = table.foreignKeys.filter(
      (fk) => fk.columnNames.indexOf('water_scheduler_id') !== -1
    );
    await queryRunner.dropForeignKeys('plants', fk);
    await queryRunner.dropColumn('plants', 'water_scheduler_id');
  }
}
