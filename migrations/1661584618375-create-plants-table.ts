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
                        type: "text",
                        isNullable: true

                    },
                    {
                        name: "color",
                        type: "varchar",
                        isNullable: true

                    },
                    {
                        name: "age",
                        type: "int",
                        isNullable: true

                    },

                    {
                        name: "image",
                        type: "varchar[]",
                        isNullable: true

                    },
                    {
                        name: "is_deleted",
                        type: "boolean",
                        default: false
                    },
                    {
                        name: "create_at",
                        type: "timestamp",
                        isNullable: true

                    },
                    {
                        name: "update_at",
                        type: "timestamp",
                        isNullable: true
                    },
                    {
                        name: "garden_id",
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
                columnNames: ["garden_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "garden",
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
            (fk.columnNames.indexOf("garden_id") !== -1) ||
            (fk.columnNames.indexOf("owner") !== -1) ||
            (fk.columnNames.indexOf("plant_type") !== -1))
            ;
        await queryRunner.dropForeignKeys("plants", fks);
        await queryRunner.dropTable('plants');
    }

}
