import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class createRoomTable1660842835075 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "garden_room",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                        isUnique: true,

                    },
                    {
                        name: "name",
                        type: "text"
                    },
                    {
                        name: "image",
                        type: "varchar"
                    },
                    {
                        name: "size",
                        type: "int",
                        default: 0
                    },
                    {
                        name: "location",
                        type: "text"
                    },
                    {
                        name: "add_by",
                        type: "int",
                        isNullable: true

                    },
                    {
                        name: "add_on",
                        type: "timestamp",
                        isNullable: true
                    },
                    {
                        name: "upd_by",
                        type: "int",
                        isNullable: true
                    },
                    {
                        name: "upd_on",
                        type: "timestamp",
                        isNullable: true
                    },
                    {
                        name: "parent_room_id",
                        type: "int"
                    },
                    {
                        name: "owner",
                        type: "int"
                    }
                ]
            })
        );
        // Create foreign keys
        await queryRunner.createForeignKey(
            "garden_room",
            new TableForeignKey({
                columnNames: ["owner"],
                referencedColumnNames: ["id"],
                referencedTableName: "user",
                onDelete: "CASCADE"
            })
        )

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

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("garden_room");
        const foreignKeys = table.foreignKeys.filter((fk) => (fk.columnNames.indexOf("owner") !== -1) || fk.columnNames.indexOf("parent_room_id") !== -1)
        await queryRunner.dropForeignKeys("garden_room", foreignKeys);
        await queryRunner.dropTable("garden_room");
    }

}
