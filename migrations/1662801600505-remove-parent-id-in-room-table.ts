import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm"

export class removeParentIdInRoomTable1662801600505 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable('garden_room');
        const fk = table.foreignKeys.filter((fk) => fk.columnNames.indexOf("parent_room_id") !== -1);
        await queryRunner.dropForeignKeys("garden_room", fk);
        await queryRunner.dropColumn("garden_room", "parent_room_id");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createForeignKey(
            "garden_room",
            new TableForeignKey({
                columnNames: ["parent_room_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "garden_room",
                onDelete: "CASCADE"
            })
        )
    }
}
