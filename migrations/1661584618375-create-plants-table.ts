import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class createPlantsTable1661584618375 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'plants',
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
                        name: "career_guide",
                        type: "text"
                    },
                    {
                        name: "color",
                        type: "varchar"
                    },
                    {
                        name: "age",
                        type: "int"
                    },

                    {
                        name: "image",
                        type: "varchar[]"
                    },

                    {
                        name: "decoration_location",
                        type: "varchar"
                    },

                    {
                        name: "is_deleted",
                        type: "boolean",
                        default: false
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
                        name: "garden_room_id",
                        type: "int",
                        isNullable: true
                    },
                    {
                        name: "owner",
                        type: "int",
                        isNullable: false
                    },
                    {
                        name: "plant_type_id",
                        type: "int",
                        isNullable: false
                    }
                ]
            })
        );

        await queryRunner.createForeignKey(
            "plants", // The foreign key in there.
            new TableForeignKey({
                columnNames: ["garden_room_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "garden_room",
                onDelete: "CASCADE"
            })
        )

        await queryRunner.createForeignKey(
            "plants", // The foreign key in there.
            new TableForeignKey({
                columnNames: ["owner"],
                referencedColumnNames: ["id"],
                referencedTableName: "user",
                onDelete: "CASCADE"
            })
        )

        await queryRunner.createForeignKey(
            "plants", // The foreign key in there.
            new TableForeignKey({
                columnNames: ["plant_type_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "plant_type",
                onDelete: "CASCADE"
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        /** Drop fofeign key **/
        const table = await queryRunner.getTable("plants");
        const fks = table.foreignKeys.filter((fk) =>
            (fk.columnNames.indexOf("garden_room_id") !== -1) ||
            (fk.columnNames.indexOf("owner") !== -1) ||
            (fk.columnNames.indexOf("plant_type") !== -1))
            ;
        await queryRunner.dropForeignKeys("plants", fks);
        await queryRunner.dropTable('plants');
    }

}
